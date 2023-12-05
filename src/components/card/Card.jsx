import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Card({projeto}) {

    return (
        <a className="card" href='http://localhost:5173/projetos/:projeto'>
            <span className='subject'>{projeto.disciplina}</span>

            <div className="info">
                <span className='title'>{projeto.repositorio}</span>
                <div className='smallerText'>
                    <span>{projeto.resumo}</span>
                    <a className='student' href={`http://localhost:5173/${projeto.grupo}`}>Grupo {projeto.grupo}</a>
                </div>
            </div>

            <div className='review'>
                <FontAwesomeIcon icon={faStar} className='star'></FontAwesomeIcon>
                <span>{projeto.periodo}</span>
            </div>
        </a>
    )
}