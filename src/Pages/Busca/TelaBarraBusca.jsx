import SearchBar from "../../Components/BarraBusca/BarraBusca.jsx";
import { useEffect, useState } from "react";
import Header from '../../Components/Header/index.jsx'

export default function TelaBarraBusca() {


    const [produtoSelecionado, setProdutoSelecionado] = useState({})
    const [albumSelecionado, setAlbumSelecionado] = useState({})
    const [formValidate, setFormValidate] = useState(false)
    const [listaProdutos, setListaProdutos] = useState([])


    useEffect(() => {
        fetch("http://129.146.68.51/aluno24-pfsii/categoriaProduto", { method: "GET" })
            .then((resposta) => {
                return resposta.json()

            }).then((dados) => {
                console.log('dados busca', dados)

                setListaProdutos(dados)
                console.log('state', listaProdutos)

            })
    }, [])


    return (
        <>
            <Header />
            <SearchBar
                placeHolder={'Informe a categoria do produto'}
                dados={listaProdutos}
                campoChave={"categoria"}
                campoBusca={"categoria"}
                funcaoSelecao={setProdutoSelecionado}
                valor={""}
            />

        </>
    )
}