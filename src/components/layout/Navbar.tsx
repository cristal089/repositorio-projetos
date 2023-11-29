import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="http://localhost:3000/projetos">Projetos</a>
                </li>
                <li>
                    <a href="http://localhost:3000/projetos">Novo Projeto</a>
                </li>
            </ul>
        </nav>
    )
}