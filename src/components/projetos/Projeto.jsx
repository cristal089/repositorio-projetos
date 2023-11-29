import './Projeto.css';

export default function Projeto({projeto}) {

    return (
        <div className="card">
            <span>{projeto.disciplina}</span>

            <div className="info">
                <span>{projeto.nome}</span>
                <span>{projeto.descricao}</span>
                <span>{projeto.aluno}</span>
            </div>

            <span>{projeto.nota}</span>
        </div>
    )
}