// Desenvolvido por Isabella Poloni

import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../../assets/funcoes";

export default function TableDoacao(props) {
  // const [produtos, setProdutos] = useState(props.listaProdutos);

  function filtrarDoacoesPorCPF(e) {
    const termoBusca = e.currentTarget.value;

    fetch(urlBackend + "/doacao", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaDoacoes) => {
        if (Array.isArray(listaDoacoes)) {
          const resultadoBusca = listaDoacoes.filter((doacao) =>
            doacao.cpfDoador.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setDoacoes(resultadoBusca);
        }
      });
  }

  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }


  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Nova Doação
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Busque aqui o doador pelo nome"
          onChange={filtrarDoacoesPorCPF}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            {/* <th className="text-center">Código</th> */}
            <th className="text-center">Doador</th>
            <th className="text-center">Data da Doação</th>
            <th className="text-center">Itens</th>
            {/* <th className="text-center">Ações</th> */}
          </tr>
        </thead>
        <tbody>
          {props.listaDoacoes?.map((doacao) => {
            return (
              <tr key={doacao.codigo}>
                {/* <td>{doacao.codigo}</td> */}
                <td>{doacao.cpfDoador.nome}</td>
                <td>{formatarData(doacao.dataDoacao)}</td>

                <td>
                  <ul>
                    {doacao.listaItens.map((item, index) => (
                      <li key={index}>
                        {item.produto.nome} - Quantidade: {item.quantidade}
                      </li>
                    ))}
                  </ul>
                </td>
                {/* <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Deseja atualizar os dados da doação?"
                        )
                      ) {
                        // Adicione a função para editar doação aqui
                      }
                    }}
                  >
                    <MdModeEdit />
                  </Button>{" "}
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        // Adicione a função para excluir doação aqui
                      }
                    }}
                  >
                    <HiTrash />
                  </Button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
