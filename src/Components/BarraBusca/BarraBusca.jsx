import { RiSearchLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { BiSearch } from 'react-icons/bi'
import { Container, Form, FormControl } from "react-bootstrap";
import { useRef, useState } from "react";
import "./searchbar.css";


export default function SearchBar({
    placeHolder,
    dados,
    campoChave,
    campoBusca,
    funcaoSelecao,
    valor,
}) {
    const inputBusca = useRef();
    const [termoBusca, setTermoBusca] = useState(valor ? valor : "");
    const [dadosLista, setDadosLista] = useState(dados);
    const [itemSelecionado, setItemSelecionado] = useState(false);

    function filtrarResultado() {
        setDadosLista(
            dados.filter((item) => {
                return termoBusca.length > 1
                    ? item[campoBusca].toLowerCase().includes(termoBusca.toLowerCase())
                    : false;
            })
        );
        let componenteResultado = document.querySelector("[data-resultado]");
        if (dados.length > 0) {
            componenteResultado.style.display = "block";
        } else {
            componenteResultado.style.display = "none";
        }
    }

    return (
        <Container>
            <Form.Group>
                <Form.Control
                    type="text"
                    ref={inputBusca}
                    placeholder={placeHolder}
                    value={termoBusca}
                    required
                    style={{
                        borderRadius: '0.25rem',
                        borderColor: '#ced4da',
                        padding: '0.375rem 0.75rem',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        color: '#495057',
                        backgroundColor: '#fff',
                        backgroundClip: 'padding-box',
                        boxShadow: 'inset 0 0 0 transparent',
                        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                        marginTop: '10%'
                    }}
                    onChange={(e) => {
                        setTermoBusca(e.target.value.toLowerCase());
                        filtrarResultado();
                        if (!itemSelecionado) {
                            e.target.setAttribute("aria-invalid", true);
                            e.target.setCustomValidity("erro");
                        } else {
                            e.target.removeAttribute('aria-invalid')
                            e.target.setCustomValidity("")
                        }
                    }}

                />
                <GrFormClose
                    onClick={() => {
                        setTermoBusca('');
                        filtrarResultado();
                        setItemSelecionado(false);
                        funcaoSelecao({});
                        inputBusca.current.setAttribute('aria-invalid', true);
                        inputBusca.current.setCustomValidity('xxx');
                    }}
                />
            </Form.Group>
            <div className="resultado">
                <ul data-resultado>
                    {dadosLista.map((item) => {
                        return (
                            <li
                                key={item[campoChave]}
                                onClick={() => {
                                    setTermoBusca(item[campoBusca]);
                                    setItemSelecionado(true);
                                    funcaoSelecao(item);
                                    inputBusca.current.setCustomValidity("");
                                    let componenteResultado =
                                        document.querySelector("[data-resultado]");
                                    componenteResultado.style.display = "none";
                                }}
                            >
                                {item[campoBusca]}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Container>
    );
}