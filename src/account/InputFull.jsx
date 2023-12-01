import { useState } from 'react'
import './Styles/InputFull.css'
import 'boxicons';

export default function InputFull({id, label, type, textErro = '', icon, register}) {

    const [preenchido, setPreenchido] = useState(false);

    function campoVazio(texto) {
        if (!texto) {
            setPreenchido(false);
        } else {
            setPreenchido(true);
        }
    }

    return (
        <div className='inputFull'>
            <input 
                style={{borderColor: textErro ? 'red' : preenchido ? 'lightgreen' : '#e9e9e9'}}
                id={id}
                type={type}
                {...register(id, {
                    onChange: (e) => campoVazio(e.target.value)
                })}
            />
            <label className={ preenchido ? 'labelPreen' : ''}
                htmlFor={id}
            >
                {label}
                <box-icon 
                    type="solid" 
                    name={icon}
                    color={textErro ? 'red' : preenchido ? 'lightgreen' : '#999'}
                ></box-icon>
            </label>
            <p className='erro'>{textErro}</p>
            <script src="https://unpkg.com/boxicons@2.1.3/dist/boxicons.js"></script>
        </div>
    )
}