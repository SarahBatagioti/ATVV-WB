import { useState, ChangeEvent } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "../../../global.css"

interface CPF {
    valor: string;
    dataEmissao: string;
}

interface RG {
    valor: string;
    dataEmissao: string;
}

interface Telefone {
    ddd: string;
    numero: string;
}

interface Produto {
    nome: string;
    preco: number;
}

interface Servico {
    nome: string;
    preco: number;
}

interface ClienteResponse {
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: CPF;
    rg: RG[];
    telefone: Telefone[];
    produto: Produto[];
    servico: Servico[];
}

interface Props {
    tema: string;
}

export default function BuscarClientePorCPF({ tema }: Props) {
    const [cpfBusca, setCpfBusca] = useState("");
    const [resultado, setResultado] = useState<ClienteResponse | null>(null);
    const [erro, setErro] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCpfBusca(event.target.value);
        setErro("");
        setResultado(null);
    };

    const buscarCliente = async () => {
        const cpfLimpo = cpfBusca.replace(/[^\d]/g, ""); // remove pontuação
        try {
            const response = await fetch(`http://localhost:3307/clientes/cpf/${cpfLimpo}`);
            if (!response.ok) {
                throw new Error("Cliente não encontrado");
            }

            const data: ClienteResponse = await response.json();
            setResultado(data);
        } catch (error: any) {
            setErro(error.message || "Erro na busca");
        }
    };

    return (
        <div className="container" style={{ marginTop: "40px" }}>
            <div
                className="z-depth-2"
                style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    padding: "30px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
            >
                <h5 className={`pink-text text-lighten-1 center-align`}>BUSCAR CLIENTE POR CPF</h5>

                <div className="input-field">
                    <input
                        type="text"
                        value={cpfBusca}
                        onChange={handleChange}
                        placeholder="Digite o CPF do cliente"
                        className="validate"
                    />
                </div>

                <div className="center-align">
                    <button className={`btn ${tema}`} onClick={buscarCliente}>
                        Buscar
                    </button>
                </div>

                {erro && (
                    <p className="center-align red-text" style={{ marginTop: '1.5rem' }}>
                        {erro}
                    </p>
                )}

                {resultado && (
                    <div className="card" style={{ marginTop: '1.5rem' }}>
                        <div className={`card-content  pink-text text-lighten-1`}>
                            <span className="card-title">{resultado.nome}</span>
                            <p><strong>Nome Social:</strong> {resultado.nomeSocial}</p>
                            <p><strong>Gênero:</strong> {resultado.genero}</p>
                            <p><strong>CPF:</strong> {resultado.cpf.valor}</p>
                            <p><strong>Data de Emissão:</strong> {new Date(resultado.cpf.dataEmissao).toLocaleDateString()}</p>

                            <div className="divider" style={{ margin: "10px 0" }}></div>

                            <p><strong>RG(s):</strong></p>
                            <ul>
                                {resultado.rg.map((doc, idx) => (
                                    <li key={idx}>{doc.valor} - {new Date(doc.dataEmissao).toLocaleDateString()}</li>
                                ))}
                            </ul>

                            <p><strong>Telefones:</strong></p>
                            <ul>
                                {resultado.telefone.map((tel, idx) => (
                                    <li key={idx}>({tel.ddd}) {tel.numero}</li>
                                ))}
                            </ul>

                            <p><strong>Produtos Consumidos:</strong></p>
                            <ul>
                                {resultado.produto.map((prod, idx) => (
                                    <li key={idx}>{prod.nome} - R$ {prod.preco.toFixed(2)}</li>
                                ))}
                            </ul>

                            <p><strong>Serviços Consumidos:</strong></p>
                            <ul>
                                {resultado.servico.map((serv, idx) => (
                                    <li key={idx}>{serv.nome} - R$ {serv.preco.toFixed(2)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
