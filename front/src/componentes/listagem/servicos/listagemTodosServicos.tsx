import { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Servico from "../../../modelo/Servico";
import "../../../global.css"

interface Props {
  tema: string;
}

export default function ListagemTodosServicos({ tema }: Props) {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  // Busca os serviços da API
  useEffect(() => {
    fetch("http://localhost:3307/servicos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar serviços");
        return res.json();
      })
      .then((data) => {
        const lista = data.map(
          (serv: any) => new Servico(serv.nome, serv.preco)
        );
        setServicos(lista);
      })
      .catch(() => {
        setErro("Não foi possível carregar os serviços.");
      });
  }, []);

  // Inicializa o collapsible sempre que os serviços mudarem
  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, [servicos]);

  return (
    <div className="row">
      <div className="col s10 offset-s1">
        <h4 className="center-align pink-text text-lighten-1">LISTA DE SERVIÇOS</h4>

        {erro && (
          <p className="red-text center-align" style={{ marginTop: '1rem' }}>
            {erro}
          </p>
        )}

        <ul className="collapsible">
          {servicos.map((servico, index) => (
            <li key={index}>
              <div className={`collapsible-header ${tema} white-text`}>
                <i className="material-icons">build</i>
                {servico.nome}
              </div>
              <div className="collapsible-body">
                <p><strong>Nome:</strong> {servico.nome}</p>
                <p><strong>Preço:</strong> R$ {servico.preco.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="center-align" style={{ marginTop: '1rem' }}>
          <a className={`btn-floating btn-large waves-effect waves-light left-align ${tema}`}>
            <i className="material-icons">arrow_back</i>
          </a>
          <a className={`btn-floating btn-large waves-effect waves-light left-align ${tema}`} style={{ marginLeft: '10px' }}>
            <i className="material-icons">arrow_forward</i>
          </a>
        </div>
      </div>
    </div>
  );
}
