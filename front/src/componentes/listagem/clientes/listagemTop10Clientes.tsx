import React, { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "../../../global.css"

type Props = {
  tema: string;
};

interface ClienteMaisConsumidor {
  id: number;
  nome: string;
  nomeSocial: string;
  totalConsumido: number;
}

export function ListagemTop10ClientesMaisConsumiram({ tema }: Props) {
  const [clientes, setClientes] = useState<ClienteMaisConsumidor[]>([]);

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    fetch("http://localhost:3307/clientes/topMaioresConsumidoresQuantidade")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch(() =>
        M.toast({ html: "Erro ao buscar clientes!", classes: "red darken-2" })
      );
  }, []);

  return (
    <div className="row">
      <div className="col s10 offset-s1">
        <h4 className="center-align pink-text text-lighten-1">
          TOP CLIENTES POR MAIOR QUANTIDADE CONSUMIDA
        </h4>
        <ul className="collapsible">
          {clientes.map((cliente, index) => (
            <li key={index}>
              <div className={`collapsible-header ${tema} white-text`}>
                <i className="material-icons">person</i>
                {cliente.nome}
              </div>
              <div className="collapsible-body">
                <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                <p><strong>Total Consumido:</strong> {cliente.totalConsumido}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ListagemTop10ClientesMenosConsumiram({ tema }: Props) {
  const [clientes, setClientes] = useState<ClienteMaisConsumidor[]>([]);

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    fetch("http://localhost:3307/clientes/topMenoresConsumidoresQuantidade")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch(() =>
        M.toast({ html: "Erro ao buscar clientes!", classes: "red darken-2" })
      );
  }, []);

  return (
    <div className="row">
      <div className="col s10 offset-s1">
        <h4 className="center-align pink-text text-lighten-1">
          TOP CLIENTES POR MENOR QUANTIDADE CONSUMIDA
        </h4>
        <ul className="collapsible">
          {clientes.map((cliente, index) => (
            <li key={index}>
              <div className={`collapsible-header ${tema} white-text`}>
                <i className="material-icons">person</i>
                {cliente.nome}
              </div>
              <div className="collapsible-body">
                <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                <p><strong>Total Consumido:</strong> {cliente.totalConsumido}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
