import React, { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "../../../global.css"

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: { valor: string; dataEmissao: string };
  rg: Array<{ valor: string; dataEmissao: string }>;
  telefone: Array<{ ddd: string; numero: string }>;
  produto: Array<{ nome: string; preco: number }>;
  servico: Array<{ nome: string; preco: number }>;
}

type Props = {
  tema: string;
};

const ListagemTodosClientes: React.FC<Props> = ({ tema }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Inicializa o colapsável do Materialize
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});

    // Faz a requisição à API
    fetch("http://localhost:3307/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch(() => M.toast({ html: "Erro ao carregar clientes", classes: "red darken-2" }));
  }, []);

  return (
    <div className="row">
      <div className="col s10 offset-s1">
                <h4 className="center-align pink-text text-lighten-1">LISTA DE CLIENTES</h4>
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
                    {cliente.rg.map((r, i) => (
                      <li key={i}>{r.valor} - {new Date(r.dataEmissao).toLocaleDateString()}</li>
                    ))}
                  </ul>
                </div>

                <div className="divider"></div>

                <div className="section">
                  <h6 className="pink-text text-lighten-1">Telefones</h6>
                  <ul>
                    {cliente.telefone.map((tel, i) => (
                      <li key={i}>({tel.ddd}) {tel.numero}</li>
                    ))}
                  </ul>
                </div>

                <div className="divider"></div>

                <div className="section">
                  <h6 className="pink-text text-lighten-1">Produtos Consumidos</h6>
                  <ul>
                    {cliente.produto.map((p, i) => (
                      <li key={i}>{p.nome} - R$ {p.preco.toFixed(2)}</li>
                    ))}
                  </ul>
                </div>

                <div className="divider"></div>

                <div className="section">
                  <h6 className="pink-text text-lighten-1">Serviços Consumidos</h6>
                  <ul>
                    {cliente.servico.map((s, i) => (
                      <li key={i}>{s.nome} - R$ {s.preco.toFixed(2)}</li>
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
          <a className={`btn-floating btn-large waves-effect waves-light ${tema} ml-2`}>
            <i className="material-icons">arrow_forward</i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListagemTodosClientes;
