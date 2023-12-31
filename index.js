require("dotenv").config();

const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

//Necessário para extrair os dados de Forms vindos de uma requisição POST
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

// Criação de Usuário
app.post("/createUser", async (req, res) => {
    const {username, email, senha} = req.body;
    const usersPath = path.join(__dirname, '.', 'bd', 'usuarios.json');
    const usersDB = JSON.parse(fs.readFileSync(usersPath, {encoding: 'utf8', flag: "r"}));

    // Verificação de Email
    for (let user of usersDB) {
        if (user.email === email) {
            return res.status(409).send("Email já Cadastrado. Faça Login!");
        }
    }

    // Gerar ID
    const id = usersDB.length + 1;

    // Gerar Senha Criptografada
    const salt = await bcrypt.genSalt(10);
    const senhaCrypt = await bcrypt.hash(senha, salt);

    // Gerar novo User
    const user = {
        "id": id,
        "username": username,
        "email": email,
        "senha": senhaCrypt
    }

    // Salvar novo User no BD
    usersDB.push(user);
    fs.writeFileSync(usersPath, JSON.stringify(usersDB, null, 2));
    res.send(`Usuario criado com sucesso.`);
});

// Autenticação de Usuário
app.post('/login', async (req, res) => {
    const {emailLogin, senhaLogin} = req.body;
    const usersPath = path.join(__dirname, '.', 'bd', 'usuarios.json');
    const usersDB = JSON.parse(fs.readFileSync(usersPath, {encoding: 'utf8', flag: "r"}));
    console.log('chegou aqui');

    // Validação de Email
    for (let user of usersDB) {
        if (user.email === emailLogin) {
            // Validação de Senha
            const senhaValid = await bcrypt.compare(senhaLogin, user.senha);
            console.log('chegou aqui também');
            console.log(senhaLogin);
            console.log(user.senha);
            console.log(senhaValid);

            if (senhaValid) {
                const token = JWT.sign(user, `${process.env.TOKEN}`);

                return res.json({"token": token});
            }
            return res.status(422).send("Senha incorreta");
        }
    }
    return res.status(409).send("Email não encontrado. Crie uma conta!");
});

// Rotas privadas
app.get('/projetos', verificaToken, (req,res) => {

    //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
    //__dirname é o diretorio corrente onde esse arquivo esta executando
    const jsonPath = path.join(__dirname, 'bd', 'projetos.json');
    const projetos = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    return res.json(projetos);
});

app.put(`/projetos`, verificaToken, (req, res) => {
    const id = Number(req.params.id);
    const { repositorio, grupo, matriculas, resumo, periodo, disciplina } = req.body;
    // Lê o arquivo JSON e atualiza o projeto com o ID correspondente
    const projectsPath = path.join(__dirname, 'bd', 'projetos.json');
    const projectsDB = JSON.parse(fs.readFileSync(projectsPath, { encoding: 'utf8', flag: 'r' }));

    const index = projectsDB.findIndex(projeto => projeto.id === Number(id));

    if (index !== -1) {
        projectsDB[index] = {
            id: Number(id),
            repositorio,
            grupo,
            matriculas,
            resumo,
            periodo,
            disciplina
        };

        fs.writeFileSync(projectsPath, JSON.stringify(projectsDB, null, 2));
        return res.json({ message: 'Projeto editado com sucesso' });
    } else {
        return res.status(404).json({ message: 'Projeto não encontrado' });
    }
});

app.get('/:usuario', verificaToken, (req,res) => {

  
    //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
    //__dirname é o diretorio corrente onde esse arquivo esta executando
    const usersPath = path.join(__dirname, 'bd', 'projetos.json');

    const usersDB = JSON.parse(fs.readFileSync(usersPath, { encoding: 'utf8', flag: 'r' }));
    
    const params = req.params;
    //buscar a disciplina
    for(let user of usersDB){
        if(params.usuario.toUpperCase()===user.username.toUpperCase()){
            return res.json(user);
        }
    }
    return res.status(403).send(`Conta não Encontrada!`);

});

// Criação de projeto
app.post("/projetos", async (req, res) => {
    const {repositorio, grupo, matriculas, resumo, periodo, disciplina} = req.body;
    const projectsPath = path.join(__dirname, '.', 'bd', 'projetos.json');
    const projectsDB = JSON.parse(fs.readFileSync(projectsPath, {encoding: 'utf8', flag: "r"}));

    // Gerar ID
    const id = projectsDB.length + 1;

    // Gerar novo User
    const project = {
        "id": id,
        "repositorio": repositorio,
        "grupo": grupo,
        "matriculas": matriculas,
        "resumo": resumo,
        "periodo": periodo,
        "disciplina": disciplina
    }

    // Salvar novo projeto no BD
    projectsDB.push(project);
    fs.writeFileSync(projectsPath, JSON.stringify(projectsDB, null, 2));
    res.send(`Projeto criado com sucesso.`);
});

app.delete('/projetos/:id', verificaToken, (req, res) => {
    const id = Number(req.params.id);
    const projectsPath = path.join(__dirname, 'bd', 'projetos.json');
    const projectsDB = JSON.parse(fs.readFileSync(projectsPath, { encoding: 'utf8', flag: 'r' }));

    const index = projectsDB.findIndex(projeto => projeto.id === id);

    if (index !== -1) {
        projectsDB.splice(index, 1);

        fs.writeFileSync(projectsPath, JSON.stringify(projectsDB, null, 2));
        return res.json({ message: 'Projeto excluído com sucesso' });
    } else {
        return res.status(404).json({ message: 'Projeto não encontrado' });
    }
});

// Função Autenticadora
function verificaToken(req, res, next) {
    const authHeaders = req.headers['authorization'];

    const token = authHeaders && authHeaders.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).send('Acesso Negado');
    }

    JWT.verify(token, `${process.env.TOKEN}`, (err) => {
        if (err) 
            return res.status(403).send('Token Inválido/ Expirado');
        next();
    })
}
