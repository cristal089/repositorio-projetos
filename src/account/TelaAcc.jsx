import Create from "./Create";
import Login from "./Login";
import { useState } from "react";
import './Styles/TelaAcc.css'

export default function TelaAcc() {

    const [ativo, setAtivo] = useState(false);

    function alternar() {
        ativo ? setAtivo(false) : setAtivo(true);
    }

    return (
        <div className={ativo ? 'container ativCreate' : 'container'}>
            <Login/>
            <Create/>
            <div className="painelAlternador esquerdo">
                <div className="metade">
                    <h2>Sistema de projetos da UNIFEI</h2>
                    <hr />
                    <h1>Bem Vindo</h1>
                </div>
                <div className="metade">
                    <h3>Não possui uma conta?</h3>
                    <p>Crie uma conta com suas informações pessoais</p>
                    <button onClick={alternar} className="btnAlt">Criar Conta</button>   
                </div>   
            </div>
            <div className="painelAlternador direito">
                <div className='metade'>
                    <h2>Sistema de projetos da UNIFEI</h2>
                    <hr />
                </div>
                <div className='metade'>
                    <h3>Possui uma conta?</h3>
                    <p>Acesse sua conta com suas informações pessoais</p>
                    <button onClick={alternar} className="btnAlt">Acessar Conta</button>
                </div>
            </div>
        </div>
    )
}