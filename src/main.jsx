import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Configuracoes do React Router (npm install react-router-dom)
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//Importando rotas
import Lista from "./components/lista-projetos/Lista.jsx"
import FormularioProjeto from './components/formulario-projeto/FormularioProjeto.jsx';

//Adicionando as rotas
const router = createBrowserRouter([
  {
    path: '/', //pagina home é para logar
    element: <App />
  },
  {
    path: 'projetos',
    element: <Lista />
  },
  {
    
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)