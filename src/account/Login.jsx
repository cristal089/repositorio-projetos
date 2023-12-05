import axios from "axios"
import InputFull from "./InputFull";
import * as Yup from "yup"
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import './Styles/Login.css'

const schemaLogin = Yup.object().shape({
    emailLogin: Yup
            .string()
            .required("Digite seu Email")
            .email("Email Inválido"),
    senhaLogin: Yup
            .string()
            .required("Digite sua Senha")
});

export default function Login() {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(schemaLogin)});

    const [errSenha, setErrSenha] = useState();
    const [errEmail, setErrEmail] = useState();
    const [aut, setAut] = useState(false);

    const submitLogin = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/login", data);

            const token = response.data.token;
            const users = response.data;
       
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(users));

            if (token) {
                setAut(true);
            }

        } catch (error) {
            if (error.response.status == 422) {
                setErrEmail();
                setErrSenha(error.response.data);
            }
            if (error.response.status == 409) {
                setErrEmail(error.response.data);
                setErrSenha();
            }
        }
    }

    if (aut) {
        return <Navigate to='/projetos' />
    }
    
    return(
        <form onSubmit={handleSubmit(submitLogin)} className="login">
            <h2>Acesse sua Conta</h2>

            <InputFull 
                id='emailLogin' 
                label='Email' 
                type='text'
                icon='envelope'
                register={register}
                textErro={errors.emailLogin?.message || errEmail}
            />

            <InputFull 
                id='senhaLogin' 
                label='Senha' 
                type='password'
                icon='lock-alt'
                register={register}
                textErro={errors.senhaLogin?.message || errSenha}
            />

            <button className="btnSubmit">Entrar</button>
        </form>
    )
}