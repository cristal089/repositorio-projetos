import axios from "axios"
import InputFull from "./InputFull";
import * as Yup from "yup"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import './Styles/Create.css'

const schemaCreate = Yup.object().shape({
    username: Yup
            .string()
            .required("Campo Obrigatório"),
    email: Yup
            .string()
            .required("Campo Obrigatório")
            .email("Email Inválido"),
    senha: Yup
            .string()
            .required("Campo Obrigatório")
            .min(4, "Senha deve possuir ao menos 4 digitos"),
    confSenha: Yup
            .string()
            .required("Campo Obrigatório")
            .oneOf([Yup.ref('senha')], "As senhas não correspondem")
});

export default function Create() {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(schemaCreate)});
    
    const [userMsg, setUserMsg] = useState();
    const [emailExist, setEmailExist] = useState();

    const submitCreate = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/createUser", data);
            setUserMsg(response.data);
            setEmailExist();
            reset();
        } catch (error) {
            setEmailExist(error.response.data);
        }
    }
    
    return (
        <form onSubmit={handleSubmit(submitCreate)} className="create">
            <h2>Crie sua Conta</h2>
            <InputFull 
                id='username' 
                label='Nome de Usuário'
                type='text'
                icon='user'
                register={register}
                textErro={errors.username?.message}
            />

            <InputFull 
                id='email' 
                label='Email' 
                type='text'
                icon='envelope'
                register={register}
                textErro={errors.email?.message || emailExist}
            />

            <InputFull 
                id='senha' 
                label='Senha' 
                type='password'
                icon='lock-alt'
                register={register}
                textErro={errors.senha?.message}
            />

            <InputFull 
                id='confSenha' 
                label='Confirme a Senha' 
                type='password'
                icon='lock-alt'
                register={register}
                textErro={errors.confSenha?.message}
            />

            <p className="sucessMsg">{userMsg}</p>

            <button className="btnSubmit">Cadastrar</button>
        </form>
    )
}