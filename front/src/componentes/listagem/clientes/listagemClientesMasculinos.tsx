import { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "../../../global.css"

type Props = {
  tema: string;
};

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

interface ClienteAPI {
  id: number;
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: {
    valor: string;
    dataEmissao: string;
  };
  rg: RG[];
  telefone: Telefone[];
  produto: Produto[];
  servico: Servico[];
}

export default function ListagemClientesMasculinos({ tema }: Props) {
  const [clientes, setClientes] = useState<ClienteAPI[]>([]);

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    fetch("http://localhost:3307/clientes/genero/Masculino")
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(() => {
        M.toast({ html: "Erro ao buscar clientes!", classes: "red darken-2" });
      });
  }, []);

  return (
    <div className="row">
      <div className="col s10 offset-s1">
        <h4 className="center-align pink-text text-lighten-1">CLIENTES DO GÊNERO MASCULINO</h4>
        <ul className="collapsible">
          {clientes.map((cliente, index) => (
            <li key={index}>
              <div className={`collapsible-header ${tema} white-text`}>
                <i className="material-icons">account_circle</i>
                {cliente.nome}
              </div>
              <div className="collapsible-body">
                <div className="section">
                  <h6 className="pink-text text-lighten-1">Informações Pessoais</h6>
                  <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                  <p><strong>Gênero:</strong> {cliente.genero}</p>
                  <p><strong>CPF:</strong> {cliente.cpf.valor}</p>
                  <p><strong>Data de Emissão do CPF:</strong> {new Date(cliente.cpf.dataEmissao).toLocaleDateString()}</p>
                </div>

                <div className="divider"></div>

                <div className="section">
                  <h6 className="pink-text text-lighten-1">RG(s)</h6>
                  <ul>
                    {cliente.rg.map((r, idx) => (
                      <li key={idx}>
                        {r.valor} - {new Date(r.dataEmissao).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="divider"></div>

                <div className="section">
                  <h6 className="pink-text text-lighten-1">Telefones</h6>
                  <ul>
                    {cliente.telefone.map((tel, idx) => (
                      <li key={idx}>
                        ({tel.ddd}) {tel.numero}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="divider"></div>

                <div className="section">
                  <h6 className="pink-text text-lighten-1">Produtos Consumidos</h6>
                  <ul>
                    {cliente.produto.map((prod, idx) => (
                      <li key={idx}>
                        {prod.nome} - R$ {prod.preco.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="divider"></div>

                <div className="section">
                  <h6 className="pink-text text-lighten-1">Serviços Consumidos</h6>
                  <ul>
                    {cliente.servico.map((serv, idx) => (
                      <li key={idx}>
                        {serv.nome} - R$ {serv.preco.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="center-align">
          <a className={`btn-floating btn-large waves-effect waves-light ${tema}`}>
            <i className="material-icons">arrow_back</i>
          </a>
          <a className={`btn-floating btn-large waves-effect waves-light ${tema}`}>
            <i className="material-icons">arrow_forward</i>
          </a>
        </div>
      </div>
    </div>
  );
}
