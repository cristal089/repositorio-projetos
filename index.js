require("dotenv").config();

const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');

//Necessário para extrair os dados de Forms vindos de uma requisição POST
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

app.get('/projetos', (req,res) => {

    //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
    //__dirname é o diretorio corrente onde esse arquivo esta executando
    const jsonPath = path.join(__dirname, 'bd', 'projetos.json');
    const projetos = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    return res.json(projetos);
})

app.get('/:grupo', (req,res) => {

  
    //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
    //__dirname é o diretorio corrente onde esse arquivo esta executando
    const jsonPath = path.join(__dirname, 'bd', 'projetos.json');
    const projetos = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
    
    const params = req.params;
    //buscar a disciplina
    for(let projeto of projetos){
        if(params.grupo.toUpperCase()===projeto.grupo.toUpperCase()){
            return res.json(projeto);
        }
    }
    return res.status(403).send(`Grupo Não Encontrado!`);

})