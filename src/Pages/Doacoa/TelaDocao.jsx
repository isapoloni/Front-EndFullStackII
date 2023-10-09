// Desenvolvido por Isabela Poloni

import { useState, useEffect } from "react";
import TableProduto from "../../Components/TableProduto/TableProduto";
import { Container } from "react-bootstrap";
import ProdutoForm from "../../Components/FormProduto/FormProduto";
import { urlBackend } from "../../assets/funcoes";
import Header from "../../Components/Header";
import FormDoacao from "../../Components/FormDoacao";
import TableDoacao from "../../Components/TableDoacao";

export default function CadProdutos(props) {

    const [exibirTabela, setExibirTabela] = useState(true)
    const [produtos, setProdutos] = useState([])
    const [modoEdicao, setModoEdicao] = useState(false)
    const [produtoEdicao, setProdutoEdicao] = useState({
        codigo: "",
        nome: "",
        metrica: "",
        descricao: "",
        codigoCategoria: ""
    })
    const [categoria, setCategoria] = useState()

    const [doacoes, setDoacoes] = useState([])


    function prepararTela(produto) {
        setModoEdicao(true);

        setProdutoEdicao(produto);
        setExibirTabela(false)

    }

    useEffect(() => {
        buscarDoacao()
    }, []);

    function buscarDoacao() {
        fetch(urlBackend + '/doacao', {
            method: "GET"
        }).then((resposta) => {
            return resposta.json()
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setDoacoes(dados)
            }
            else {

            }
        });
    }

    console.log('doacoes', doacoes)

    // function deletarProduto(produto) {
    //     fetch(urlBackend + '/produto', {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(produto)
    //     }).then((resposta) => {
    //         window.alert('Produto excluído com sucesso!!!')
    //         // window.location.reload();
    //         return resposta.json()
    //     })
    // }

    // useEffect(() => {
    //     buscarProduto()
    //     buscarCategoria()
    // }, []);

    // function buscarProduto() {
    //     fetch(urlBackend + '/produto', {
    //         method: "GET"
    //     }).then((resposta) => {
    //         return resposta.json()
    //     }).then((dados) => {
    //         if (Array.isArray(dados)) {
    //             setProdutos(dados)
    //         }
    //         else {

    //         }
    //     });
    // }

    // function buscarCategoria() {
    //     fetch(urlBackend + '/categoriaProduto', {
    //         method: "GET"
    //     }).then((resposta) => {
    //         return resposta.json()
    //     }).then((dados) => {
    //         if (Array.isArray(dados)) {
    //             setCategoria(dados)
    //         }
    //         else {

    //         }
    //     });
    // }


    return (
        <>
            <Header />
            <Container>
                {
                    exibirTabela ?
                        <TableDoacao
                            listaProdutos={produtos}
                            listaDoacoes={doacoes}
                            setDoacoes={setDoacoes}
                            exibirTabela={setExibirTabela}
                            editar={prepararTela}
                            // deletar={deletarProduto}
                        />
                        :
                        <FormDoacao
                            // listaProdutos={produtos}
                            // setProdutos={setProdutos}
                            exibirTabela={setExibirTabela}
                            // modoEdicao={modoEdicao}
                            // editar={prepararTela}
                            // setModoEdicao={setModoEdicao}
                            // produto={produtoEdicao}
                            // buscarProduto={buscarProduto}
                            // categorias={categoria}
                        />

                }
            </Container>
        </>
    );

}
