import React, { useState, useEffect } from 'react';
import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { urlBackend } from '../../assets/funcoes';

const FormDoacao = (props) => {
    const [doadorOptions, setDoadorOptions] = useState([]);
    const [produtoOptions, setProdutoOptions] = useState([]);
    const [pessoasData, setPessoasData] = useState([]); // Adicione este estado
    const [produtosData, setProdutosData] = useState([]); // Adicione este estado
    const [doacao, setDoacao] = useState({
        doador: null, // Alterado para armazenar o objeto do doador completo
        dataDoacao: '',
        listaItens: [],
    });

    // Funções para buscar doadores e produtos 
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Requisição GET para buscar pessoas
                const pessoasResponse = await fetch(urlBackend + '/pessoas', {
                    method: 'GET',
                });

                if (pessoasResponse.ok) {
                    const pessoasData = await pessoasResponse.json();
                    setPessoasData(pessoasData);

                    // Extrai os nomes das pessoas
                    const nomes = pessoasData.map((pessoa) => pessoa.nome);

                    // Atualiza o estado doadorOptions com os nomes
                    setDoadorOptions(nomes);
                } else {
                    console.error('Erro ao buscar pessoas:', pessoasResponse.statusText);
                }

                // Requisição GET para buscar produtos
                const produtosResponse = await fetch(urlBackend + '/produto', {
                    method: 'GET',
                });

                if (produtosResponse.ok) {
                    const produtosData = await produtosResponse.json();
                    setProdutosData(produtosData);

                    // Extrai os nomes dos produtos
                    const nomesProdutos = produtosData.map((produto) => produto.nome);

                    // Atualiza o estado produtoOptions com os nomes dos produtos
                    setProdutoOptions(nomesProdutos);
                } else {
                    console.error('Erro ao buscar produtos:', produtosResponse.statusText);
                }

            } catch (error) {
                console.error('Erro inesperado:', error);
            }
        };

        fetchData();
    }, []);

    // console.log('doadorOptions', doadorOptions)
    console.log('produtoOptions', produtoOptions)

    const handleDoadorChange = (e) => {
        // Encontra o objeto do doador correspondente ao nome selecionado
        const doadorSelecionado = pessoasData.find((pessoa) => pessoa.nome === e.target.value);

        // Atualiza o estado doacao com o doador selecionado
        setDoacao({ ...doacao, doador: doadorSelecionado });
    };

    const handleProdutoChange = (index, e) => {
        // Encontra o objeto do produto correspondente ao nome selecionado
        const produtoSelecionado = produtosData.find((produto) => produto.nome === e.target.value);

        // Atualiza a lista de itens no estado da doação com o produto selecionado
        const updatedItens = [...doacao.listaItens];
        updatedItens[index].produto = produtoSelecionado;
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleDataDoacaoChange = (e) => {
        // Atualiza a data de doação no estado da doação
        setDoacao({ ...doacao, dataDoacao: e.target.value });
    };


    const handleQuantidadeChange = (index, e) => {
        // Atualiza a quantidade no estado da doação
        const updatedItens = [...doacao.listaItens];
        updatedItens[index].quantidade = e.target.value;
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleAddItem = () => {
        // Adiciona um novo item à lista de itens
        setDoacao({
            ...doacao,
            listaItens: [...doacao.listaItens, { produto: '', quantidade: 1 }],
        });
    };
    const handleRemoveItem = (index) => {
        // Remove o item correspondente ao índice da lista
        const updatedItens = [...doacao.listaItens];
        updatedItens.splice(index, 1);
        setDoacao({ ...doacao, listaItens: updatedItens });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Encontrar o CPF do doador selecionado
            const cpfDoadorSelecionado = doacao.doador ? doacao.doador.cpf.replace(/[.-]/g, '') : '';

            // Formatar a lista de itens conforme o novo formato
            const listaItensFormatada = doacao.listaItens.map((item) => ({
                codigoProduto: item.produto.codigo,
                quantidade: item.quantidade,
            }));

            // Criar o corpo da requisição
            const requestBody = {
                dataDoacao: doacao.dataDoacao,
                cpfDoador: cpfDoadorSelecionado,
                listaItens: listaItensFormatada,
            };

            // Enviar a requisição POST
            const response = await fetch(urlBackend + '/doacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                window.alert('Doação enviada com sucesso!');
                console.log('Doação enviada com sucesso!', JSON.stringify(requestBody));
                // Limpa o formulário após o envio bem-sucedido
                setDoacao({
                    doador: null,
                    dataDoacao: '',
                    listaItens: [],
                });
            } else {
                window.alert('Erro ao enviar a doação.');
                console.error('Erro ao enviar a doação.', JSON.stringify(requestBody));
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
            window.alert('Erro inesperado:', error, JSON.stringify(requestBody));
        }
    };

    return (
        <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3">
                <Form.Label>Doador</Form.Label>
                <InputGroup className="mb-3">
                    <FormControl
                        as="select"
                        onChange={handleDoadorChange}
                        value={doacao.doador ? doacao.doador.nome : ''}
                    >
                        <option value="" disabled>
                            Selecione um doador
                        </option>
                        {doadorOptions.map((doador, index) => (
                            <option key={index} value={doador}>
                                {doador}
                            </option>
                        ))}
                    </FormControl>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Data da Doação</Form.Label>
                <FormControl
                    type="date"
                    onChange={handleDataDoacaoChange}
                    value={doacao.dataDoacao}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="mb-3">Itens da Doação</Form.Label>
                {doacao.listaItens.map((item, index) => (
                    <div key={index} className="mb-3">
                        <InputGroup className="mb-3">
                            <FormControl
                                as="select"
                                onChange={(e) => handleProdutoChange(index, e)}
                                value={item.produto ? item.produto.nome : ''}
                            >
                                <option value="" disabled>
                                    Selecione um produto
                                </option>
                                {produtoOptions.map((produto, index) => (
                                    <option key={index} value={produto}>
                                        {produto}
                                    </option>
                                ))}
                            </FormControl>
                            <FormControl
                                type="number"
                                min="1"
                                onChange={(e) => handleQuantidadeChange(index, e)}
                                value={item.quantidade}
                            />
                            <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                                Remover
                            </Button>
                        </InputGroup>
                    </div>
                ))}
                <Button variant="secondary" onClick={handleAddItem} className='ml-5'>
                    Adicionar Item
                </Button>
            </Form.Group>


            <Button
                variant="danger"
                type="button"
                onClick={() => {
                    props.exibirTabela(true);
                }}
            >
                Voltar
            </Button>
            <Button variant="primary" type="submit" onSubmit={handleSubmit} >
                Enviar Doação
            </Button>
        </Form>
    );
};

export default FormDoacao;
