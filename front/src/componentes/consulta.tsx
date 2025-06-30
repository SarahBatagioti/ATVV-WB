import { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import "../global.css"

import ListagemTodosClientes from "./listagem/clientes/listagemTodosClientes";
import ListagemTop5Clientes from "./listagem/clientes/listagemTop5Clientes";
import ListagemClientesMasculinos from "./listagem/clientes/listagemClientesMasculinos";
import ListagemClientesFemininos from "./listagem/clientes/listagemClientesFemininos";
import ListagemTodosProdutos from "./listagem/produtos/listagemTodosProdutos";
import ListagemTodosServicos from "./listagem/servicos/listagemTodosServicos";
import BuscarServicoPorNome from "./listagem/servicos/buscarServicoPorNome";
import BuscarProdutoPorNome from "./listagem/produtos/buscarProdutoPorNome";
import BuscarClientePorCPF from "./listagem/clientes/buscarClientePorCPF";
import {
    ListagemTop10ClientesMaisConsumiram,
    ListagemTop10ClientesMenosConsumiram
} from "./listagem/clientes/listagemTop10Clientes";
import ListagemProdutosMaisVendidos from "./listagem/produtos/listagemProdutosMaisVendidos";
import ListagemProdutosMaisVendidosMasculino from "./listagem/produtos/ListagemProdutosMaisVendidosMasculino";
import ListagemProdutosMaisVendidosFeminino from "./listagem/produtos/ListagemProdutosMaisVendidosFeminino";
import ListagemServicosMaisVendidos from "./listagem/servicos/ListagemServicosMaisVendidos";
import ListagemServicosMaisConsumidosMasculino from "./listagem/servicos/ListagemServicosMaisConsumidosMasculino";
import ListagemServicosMaisConsumidosFeminino from "./listagem/servicos/ListagemServicosMaisConsumidosFeminino";

interface Props {
    tema: string;
};

export default function Relatórios(data: Props) {
    const [componenteVisivel, setComponenteVisivel] = useState<String>()

    useEffect(() => {
        const elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {
            coverTrigger: false,
            closeOnClick: true,
            alignment: 'left'
        });
    }, []);




    const renderComponente = () => {
        switch (componenteVisivel) {
            case "todosClientes":
                return <ListagemTodosClientes tema={data.tema} />;
            case "top10ClientesMaisConsumiram":
                return <ListagemTop10ClientesMaisConsumiram tema={data.tema} />;
            case "top10ClientesMenosConsumiram":
                return <ListagemTop10ClientesMenosConsumiram tema={data.tema} />;
            case "top5Clientes":
                return <ListagemTop5Clientes tema={data.tema} />;
            case "clientesMasculinos":
                return <ListagemClientesMasculinos tema={data.tema} />;
            case "clientesFemininos":
                return <ListagemClientesFemininos tema={data.tema} />;
            case "produtos":
                return <ListagemTodosProdutos tema={data.tema} />;
            case "produtosMaisVendidos":
                return <ListagemProdutosMaisVendidos tema={data.tema} />
            case "produtoMaisVendidosMasculino":
                return <ListagemProdutosMaisVendidosMasculino tema={data.tema} />
            case "produtoMaisVendidosFeminino":
                return <ListagemProdutosMaisVendidosFeminino tema={data.tema} />
            case "servicos":
                return <ListagemTodosServicos tema={data.tema} />;
            case "servicosMaisVendidos":
                return <ListagemServicosMaisVendidos tema={data.tema} />
            case "servicosMaisVendidosMasculino":
                return <ListagemServicosMaisConsumidosMasculino tema={data.tema} />
            case "servicosMaisVendidosFeminino":
                return <ListagemServicosMaisConsumidosFeminino tema={data.tema} />
            case "buscarCliente":
                return <BuscarClientePorCPF tema={data.tema} />;
            case "buscarServico":
                return <BuscarServicoPorNome tema={data.tema} />;
            case "buscarProduto":
                return <BuscarProdutoPorNome tema={data.tema} />;
            default:
                return null;
        }
    }

    return (
        <div className="container" style={{ marginTop: '1rem' }}>

            <div className="row">
                {/* Componente Buscar Serviço */}
                <div className="col s12 m6 l4 xl4" style={{ padding: '10px' }}>
                        <div className="card-content">
                            <BuscarServicoPorNome tema={data.tema} />
                        </div>
                </div>

                {/* Componente Buscar Produto */}
                <div className="col s12 m6 l4 xl4" style={{ padding: '10px' }}>
                        <div className="card-content">
                            <BuscarProdutoPorNome tema={data.tema} />
                    </div>
                </div>

                {/* Componente Buscar Cliente */}
                <div className="col s12 m6 l4 xl4" style={{ padding: '10px' }}>
                        <div className="card-content">
                            <BuscarClientePorCPF tema={data.tema} />
                    </div>
                </div>
            </div>
            <div className="row center-align">
                {/* Menu Clientes */}
                <div className="col s12 m4" style={{ marginTop: '1rem' }}>
                    <a className={`dropdown-trigger btn ${data.tema} white-text`} href='#' data-target='dropdown-clientes'>
                        Menu Clientes
                    </a>
                    <ul id='dropdown-clientes' className='dropdown-content'>
                        <li><a onClick={() => setComponenteVisivel("todosClientes")}>Listar todos os clientes</a></li>
                        <li><a onClick={() => setComponenteVisivel("top10ClientesMaisConsumiram")}>Top 10 clientes (mais consumiram)</a></li>
                        <li><a onClick={() => setComponenteVisivel("top10ClientesMenosConsumiram")}>Top 10 clientes (menos consumiram)</a></li>
                        <li><a onClick={() => setComponenteVisivel("top5Clientes")}>Top 5 clientes (maior valor)</a></li>
                        <li><a onClick={() => setComponenteVisivel("clientesMasculinos")}>Filtrar por gênero (Masculino)</a></li>
                        <li><a onClick={() => setComponenteVisivel("clientesFemininos")}>Filtrar por gênero (Feminino)</a></li>
                    </ul>
                </div>

                {/* Menu Produtos */}
                <div className="col s12 m4" style={{ marginTop: '1rem' }}>
                    <a className={`dropdown-trigger btn ${data.tema} white-text`} href='#' data-target='dropdown-produtos'>
                        Menu Produtos
                    </a>
                    <ul id='dropdown-produtos' className='dropdown-content'>
                        <li><a onClick={() => setComponenteVisivel("produtos")}>Listar todos os produtos</a></li>
                        <li><a onClick={() => setComponenteVisivel("produtosMaisVendidos")}>Listar produtos mais vendidos</a></li>
                        <li><a onClick={() => setComponenteVisivel("produtoMaisVendidosMasculino")}>Listar produtos mais vendidos por gênero (Masculino)</a></li>
                        <li><a onClick={() => setComponenteVisivel("produtoMaisVendidosFeminino")}>Listar produtos mais vendidos por gênero (Feminino)</a></li>
                    </ul>
                </div>

                {/* Menu Serviços */}
                <div className="col s12 m4" style={{ marginTop: '1rem' }}>
                    <a className={`dropdown-trigger btn ${data.tema} white-text`} href='#' data-target='dropdown-servicos'>
                        Menu Serviços
                    </a>
                    <ul id='dropdown-servicos' className='dropdown-content'>
                        <li><a onClick={() => setComponenteVisivel("servicos")}>Listar todos os serviços</a></li>
                        <li><a onClick={() => setComponenteVisivel("servicosMaisVendidos")}>Listar serviços mais consumidos</a></li>
                        <li><a onClick={() => setComponenteVisivel("servicosMaisVendidosMasculino")}>Listar serviços mais consumidos por gênero (Masculino)</a></li>
                        <li><a onClick={() => setComponenteVisivel("servicosMaisVendidosFeminino")}>Listar serviços mais consumidos por gênero (Feminino)</a></li>
                    </ul>
                </div>
            </div>

            {renderComponente()}
        </div>
    );
}
