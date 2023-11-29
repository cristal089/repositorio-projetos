import { useEffect, useState } from "react"
import Card from "../card/Card"
import axios from 'axios';
import { useForm } from "react-hook-form";

import './Lista.css';

export default function Lista() {

    const [validado, setValidado] = useState(false);
    const [formData, setFormData] = useState({
        sigla : ' '
    })
    
    const form = useForm();
    const { register, handleSubmit } = form;

    const submit = (data) => {
        setFormData({...formData, ...data});
    }

    useEffect(() => {
        async function valida(){
            try {
                const resposta = await axios.get(`http://localhost:3000/projetos`);
                //console.log(resposta);
                if(resposta.status === 200)
                    setValidado(true);
            } catch(error){
                setValidado(false);
            }
        }
        valida();
    }, []);

    return (
        <div className="page-list">
            <h2 className="page-title">Todos os projetos</h2>
            <BuscaProjeto formData={formData}/>
        </div>
    )
}

export function BuscaProjeto({formData}){

    const [msg, setMsg] = useState('');
    const [projeto, setProjeto] = useState(<p>...</p>);
    const view = [];

    useEffect(() => {
        const submit = async () => {
            let endPoint = 'http://localhost:3000/projetos';
            endPoint = `${endPoint}/${formData.sigla}`
            try{
                const dados = await axios.get(`${endPoint}`);
                if(Array.isArray(dados.data)){
                    for(let projeto of dados.data){
                        view.push(<Card projeto={projeto} />);
                    }
                }else{
                    view.push(<Card projeto={dados.data} />);
                }
                setProjeto(view);
                setMsg('');
            }catch(error){
                setMsg(error.response.data);
                setProjeto(<p></p>);
            }
        }
        submit();
    }, [formData]);

    return(
        <>
            {projeto}
            {msg}
        </>
    )

}