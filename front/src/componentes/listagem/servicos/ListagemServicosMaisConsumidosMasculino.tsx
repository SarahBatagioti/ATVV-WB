import { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "../../../global.css"

interface ServicoMaisConsumido {
  id: number;
  nome: string;
  preco: number;
  totalClientes: number;
}

interface Props {
  tema: string;
}

export default function ListagemServicosMaisConsumidosMasculino({ tema }: Props) {
  const [servicos, setServicos] = useState<ServicoMaisConsumido[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3307/servicos/maisVendidosPorGenero/Masculino")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar serviços para o gênero Masculino");
        return res.json();
      })
      .then((data) => setServicos(data))
      .catch(() => setErro("Não foi possível carregar os serviços mais consumidos."));
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, [servicos]);

  return (
    <div className="row">
      <div className="col s10 offset-s1">
        <h4 className="center-align pink-text text-lighten-1">
          SERVIÇOS MAIS CONSUMIDOS POR CLIENTES MASCULINOS
        </h4>

        {erro && (
          <p className="red-text center-align" style={{ marginTop: '1rem' }}>
            {erro}
          </p>
        )}

        <ul className="collapsible">
          {servicos.map((servico, index) => (
            <li key={index}>
              <div className={`collapsible-header ${tema} white-text`}>
                <i className="material-icons">cut</i>
                {servico.nome}
              </div>
              <div className="collapsible-body">
                <p><strong>Nome:</strong> {servico.nome}</p>
                <p><strong>Preço:</strong> R$ {servico.preco.toFixed(2)}</p>
                <p><strong>Quantidade de Clientes:</strong> {servico.totalClientes}</p>
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
