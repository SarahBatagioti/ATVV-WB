import M from "materialize-css";
import { useEffect, useState } from "react";
import "../global.css"

interface Props {
  tema: string;
}

export default function FormularioCadastroProduto({ tema }: Props) {
  const [nomeCriar, setNomeCriar] = useState("");
  const [precoCriar, setPrecoCriar] = useState("");

  const [nomeRemover, setNomeRemover] = useState("");

  const [nomeAntigo, setNomeAntigo] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
  }, []);

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  const criarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3307/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeCriar, preco: parseFloat(precoCriar) }),
      });
      if (!res.ok) throw new Error("Erro ao criar produto");
      M.toast({ html: "Produto criado com sucesso!", classes: "green darken-2" });
      setNomeCriar("");
      setPrecoCriar("");
    } catch {
      M.toast({ html: "Erro ao criar produto", classes: "red darken-2" });
    } finally {
      setLoading(false);
    }
  };

  const deletarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3307/produtosPorNome/${nomeRemover}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar produto");
      M.toast({ html: "Produto deletado com sucesso!", classes: "green darken-2" });
      setNomeRemover("");
    } catch {
      M.toast({ html: "Erro ao deletar produto", classes: "red darken-2" });
    } finally {
      setLoading(false);
    }
  };

  const abrirModalAtualizar = async () => {
    if (!nomeAntigo.trim()) {
      M.toast({ html: "Informe o nome antigo para buscar", classes: "red darken-2" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3307/produtos/${nomeAntigo}`);
      if (!res.ok) throw new Error("Produto não encontrado");
      const produto = await res.json();
      setNovoNome(produto.nome);
      setNovoPreco(produto.preco.toString());

      const modal = document.getElementById("modalProduto");
      if (modal) {
        const instance = M.Modal.getInstance(modal);
        instance.open();
      }
    } catch {
      M.toast({ html: "Produto não encontrado", classes: "red darken-2" });
    } finally {
      setLoading(false);
    }
  };

  const atualizarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3307/produtosPorNome/${nomeAntigo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome, preco: parseFloat(novoPreco) }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar produto");
      M.toast({ html: "Produto atualizado com sucesso!", classes: "green darken-2" });
      setNomeAntigo("");
      setNovoNome("");
      setNovoPreco("");
    } catch {
      M.toast({ html: "Erro ao atualizar produto", classes: "red darken-2" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div
        className="card white z-depth-2"
        style={{
          width: '90%',
          margin: '20px auto',
          padding: '10px'
        }}
      >
        <div className="card-content">
          {/* Criar Produto */}
          <form className="row" onSubmit={criarProduto}>
            <h4 className="pink-text text-lighten-1">CRIAR PRODUTO</h4>
            <div className="row">
              <div className="input-field col s12 m6">
                <input id="nome_criar_produto" type="text" value={nomeCriar} onChange={(e) => setNomeCriar(e.target.value)} required />
                <label htmlFor="nome_criar_produto" className={nomeCriar ? "active" : ""}>Nome*</label>
              </div>
              <div className="input-field col s12 m6">
                <input id="preco_criar_produto" type="number" min="0.01" step="0.01" value={precoCriar} onChange={(e) => setPrecoCriar(e.target.value)} required />
                <label htmlFor="preco_criar_produto" className={precoCriar ? "active" : ""}>Preço*</label>
              </div>
            </div>
            <button className={estiloBotao} type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"} <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>

            <div
                className="card white z-depth-2"
                style={{
                    width: '90%',
                    margin: '20px auto',
                    padding: '10px'
                }}
            >
                <div className="card-content">
      {/* Remover Produto */}
      <form className="row" onSubmit={deletarProduto}>
        <h4 className="pink-text text-lighten-1">REMOVER PRODUTO</h4>
        <div className="row">
          <div className="input-field col s12 m6">
            <input id="nome_remover_produto" type="text" value={nomeRemover} onChange={(e) => setNomeRemover(e.target.value)} required />
            <label htmlFor="nome_remover_produto" className={nomeRemover ? "active" : ""}>Nome*</label>
          </div>
        </div>
        <button className={estiloBotao} type="submit" disabled={loading}>
          {loading ? "Removendo..." : "Remover"} <i className="material-icons right">highlight_off</i>
        </button>
      </form>
      </div>
      </div>

            <div
                className="card white z-depth-2"
                style={{
                    width: '90%',
                    margin: '20px auto',
                    padding: '10px'
                }}
            >
                <div className="card-content">
      {/* Atualizar Produto */}
      <form className="row">
        <h4 className="pink-text text-lighten-1">ATUALIZAR PRODUTO</h4>
        <div className="row">
          <div className="input-field col s12 m6">
            <input id="nome_antigo_produto" type="text" value={nomeAntigo} onChange={(e) => setNomeAntigo(e.target.value)} required />
            <label htmlFor="nome_antigo_produto" className={nomeAntigo ? "active" : ""}>Nome Antigo*</label>
          </div>
        </div>
        <button className={estiloBotao} type="button" onClick={abrirModalAtualizar} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"} <i className="material-icons right">search</i>
        </button>
      </form>
      </div>
      </div>

      {/* Modal de Atualização */}
      <div id="modalProduto" className="modal">
        <div className="modal-content">
          <form className="col s12" onSubmit={atualizarProduto}>
            <h4 className="pink-text text-lighten-1">ATUALIZAR PRODUTO</h4>
            <div className="row">
              <div className="input-field col s12 m6">
                <input id="novo_nome_produto" type="text" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required />
                <label htmlFor="novo_nome_produto" className={novoNome ? "active" : ""}>Novo Nome*</label>
              </div>
              <div className="input-field col s12 m6">
                <input id="novo_preco_produto" type="number" min="0.01" step="0.01" value={novoPreco} onChange={(e) => setNovoPreco(e.target.value)} required />
                <label htmlFor="novo_preco_produto" className={novoPreco ? "active" : ""}>Novo Preço*</label>
              </div>
            </div>
            <button className={estiloBotao} type="submit" disabled={loading}>
              {loading ? "Atualizando..." : "Enviar"} <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <a className="modal-close waves-effect waves-green btn-flat pink-text text-lighten-1">
            Sair
          </a>
        </div>
      </div>
    </div>
  );
}
