import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import Relatórios from "./consulta";
import FormularioCadastroServico from "./formularioCadastroServico";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import "../global.css"

export default function Roteador() {
    const [tela, setTela] = useState("Relatórios")


    function selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        setTela(novaTela)
    }

    let barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="pink lighten-2" botoes={['Relatórios', 'Cadastro Cliente', 'Cadastro Serviço', 'Cadastro Produto']} />
    if (tela === 'Relatórios') {
        return (
            <>
                {barraNavegacao}
                <Relatórios tema="pink lighten-2" />
            </>
        )
    } else if (tela === 'Cadastro Cliente') {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastroCliente tema="pink lighten-2" />
            </>
        )
    } else if (tela === 'Cadastro Serviço') {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastroServico tema="pink lighten-2" />
            </>
        )
    } else if (tela === 'Cadastro Produto') {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastroProduto tema="pink lighten-2" />
            </>
        )
    }
    return <></>

}
