import { useState } from "react";
import M from "materialize-css";
import "../global.css"

interface Props {
    cpf: string;
    tema: string;
}

const FormSelector = ({ cpf, tema }: Props) => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [telefone, setTelefone] = useState({ ddd: "", numero: "" });
    const [rg, setRG] = useState({ valor: "", dataEmissao: "" });
    const [produto, setProduto] = useState("");
    const [servico, setServico] = useState("");

    const estiloBotao = `btn waves-effect waves-light ${tema}`;

    const handleSubmit = async () => {
        if (!cpf) return M.toast({ html: "Informe o CPF", classes: "red" });

        try {
            // Buscar cliente pelo CPF
            const res = await fetch(`http://localhost:3307/clientes/cpf/${cpf}`);
            if (!res.ok) throw new Error("Cliente não encontrado");
            const cliente = await res.json();
            const id = cliente.id;

            let endpoint = "";
            let body = {};

            switch (selectedOption) {
                case "Telefone":
                    endpoint = `/clientes/${id}/telefone`;
                    body = telefone;
                    break;

                case "RG":
                    endpoint = `/clientes/${id}/rg`;
                    body = rg;
                    break;

                case "Produto Consumido":
                    const resProduto = await fetch(`http://localhost:3307/produtos/${produto}`);
                    if (!resProduto.ok) throw new Error("Produto não encontrado");
                    const produtoData = await resProduto.json();
                    endpoint = `/clientes/${id}/produtos`;
                    body = { produtoId: produtoData.id };
                    break;

                case "Serviço Consumido":
                    const resServico = await fetch(`http://localhost:3307/servicos/${servico}`);
                    if (!resServico.ok) throw new Error("Serviço não encontrado");
                    const servicoData = await resServico.json();
                    endpoint = `/clientes/${id}/servicos`;
                    body = { servicoId: servicoData.id };
                    break;

                default:
                    return;
            }

            // Enviar os dados
            const response = await fetch(`http://localhost:3307${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error();
            M.toast({ html: "Dado adicionado com sucesso!", classes: "green" });
        } catch (err: any) {
            const msg = err.message || "Erro ao adicionar dado";
            M.toast({ html: msg, classes: "red" });
        }
    };

    return (
        <div>
            <div className="input-field col s12">
                <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                    <option value="" disabled>Escolha uma opção</option>
                    <option value="Telefone">Telefone</option>
                    <option value="RG">RG</option>
                    <option value="Serviço Consumido">Serviço Consumido</option>
                    <option value="Produto Consumido">Produto Consumido</option>
                </select>
                <label className="pink-text text-lighten-1">Tipo de Dado*</label>
            </div>

            {selectedOption === "Telefone" && (
                <>
                    <div className="input-field col s2">
                        <input type="text" value={telefone.ddd} onChange={e => setTelefone({ ...telefone, ddd: e.target.value })} />
                        <label className="active pink-text text-lighten-1">DDD</label>
                    </div>
                    <div className="input-field col s10">
                        <input type="text" value={telefone.numero} onChange={e => setTelefone({ ...telefone, numero: e.target.value })} />
                        <label className="active pink-text text-lighten-1">Telefone</label>
                    </div>
                </>
            )}

            {selectedOption === "RG" && (
                <>
                    <div className="input-field col s12 m6">
                        <input type="text" value={rg.valor} onChange={e => setRG({ ...rg, valor: e.target.value })} />
                        <label className="active pink-text text-lighten-1">RG</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input type="date" value={rg.dataEmissao} onChange={e => setRG({ ...rg, dataEmissao: e.target.value })} />
                        <label className="active pink-text text-lighten-1">Data de Emissão</label>
                    </div>
                </>
            )}

            {selectedOption === "Produto Consumido" && (
                <div className="input-field col s12">
                    <input type="text" value={produto} onChange={e => setProduto(e.target.value)} />
                    <label className="active pink-text text-lighten-1">Nome do Produto</label>
                </div>
            )}

            {selectedOption === "Serviço Consumido" && (
                <div className="input-field col s12">
                    <input type="text" value={servico} onChange={e => setServico(e.target.value)} />
                    <label className="active pink-text text-lighten-1">Nome do Serviço</label>
                </div>
            )}

            <div className="col s12">
                <button className={estiloBotao} type="button" onClick={handleSubmit}>
                    Enviar
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </div>
    );
};

export default FormSelector;
