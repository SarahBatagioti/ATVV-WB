import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import "../global.css"
import { useEffect, useState } from "react";


interface Props {
    tema: string,
    botoes: string[],
    seletorView: Function
}
const gerarListaBotoes = (data: Props) => {
    if (data.botoes.length <= 0) {
        return <></>
    } else {
        let lista = data.botoes.map(valor =>
            <li key={valor}><a onClick={(e) => data.seletorView(valor, e)}>{valor}</a></li>
        )
        return lista
    }
}

export default function BarraNavegacao(data: Props) {
    document.addEventListener('DOMContentLoaded', function () {
        let elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems)
    });

    let estilo = `${data.tema}`;

    return (
        <>
            <nav className={`${estilo} z-depth-2`}>
                <div className="nav-wrapper container">
                    <a
                        href="/"
                        className="brand-logo"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <img
                            src="/images/logo.png"
                            alt="Logo WB"
                            className="logo-wb"
                        />

                    </a>

                    <a href="#" data-target="mobile-menu" className="sidenav-trigger" style={{ cursor: 'pointer' }}>
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        {gerarListaBotoes(data)}
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-menu" style={{ paddingTop: '1rem' }}>
                {gerarListaBotoes(data)}
            </ul>
        </>
    );
}