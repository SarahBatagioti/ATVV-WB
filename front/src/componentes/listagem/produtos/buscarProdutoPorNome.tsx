import { useState, ChangeEvent } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "../../../global.css"

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Props {
  tema: string;
}

export default function BuscarProdutoPorNome({ tema }: Props) {
  const [nomeBusca, setNomeBusca] = useState("");
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomeBusca(event.target.value);
    setErro("");
    setProduto(null);
  };

  const buscarProduto = async () => {
    const nomeFormatado = nomeBusca.trim();
    if (!nomeFormatado) {
      setErro("Digite um nome válido");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3307/produtos/${nomeFormatado}`);
      if (!response.ok) {
        throw new Error("Produto não encontrado");
      }

      const data: Produto = await response.json();
      setProduto(data);
    } catch (error: any) {
      setErro(error.message || "Erro ao buscar produto");
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
        <h5 className={`pink-text text-lighten-1 center-align`}>BUSCAR PRODUTO POR NOME</h5>

        <div className="input-field">
          <input
            type="text"
            value={nomeBusca}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
            className="validate"
          />
        </div>

        <div className="center-align">
          <button className={`btn ${tema}`} onClick={buscarProduto}>
            Buscar
          </button>
        </div>

        {erro && (
          <p className="center-align red-text" style={{ marginTop: '1.5rem' }}>
            {erro}
          </p>
        )}

        {produto && (
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className={`card-content pink-text text-lighten-1`}>
              <span className="card-title">{produto.nome}</span>
              <p><strong>ID:</strong> {produto.id}</p>
              <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
