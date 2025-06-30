import { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "../../../global.css"

type Props = {
    tema: string;
};

interface ClienteTopGasto {
    id: number;
    nome: string;
    nomeSocial: string;
    valorTotalGasto: number;
}

export default function ListagemTop5Clientes({ tema }: Props) {
    const [clientes, setClientes] = useState<ClienteTopGasto[]>([]);

    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems);

        fetch("http://localhost:3307/clientes/topGasto")
            .then(res => res.json())
            .then(data => setClientes(data))
            .catch(() =>
                M.toast({ html: "Erro ao buscar clientes!", classes: "red darken-2" })
            );
    }, []);

    return (
        <div className="row">
            <div className="col s10 offset-s1">
                <h4 className="center-align pink-text text-lighten-1">TOP 5 CLIENTES POR VALOR GASTO</h4>
                <ul className="collapsible">
                    {clientes.map((cliente, index) => (
                        <li key={index}>
                            <div className={`collapsible-header ${tema} white-text`}>
                                <i className="material-icons">monetization_on</i>
                                {cliente.nome}
                            </div>
                            <div className="collapsible-body">
                                <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                                <p><strong>Valor Total Gasto:</strong> R$ {cliente.valorTotalGasto.toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
