import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Configuracoes do React Router (npm install react-router-dom)
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//Importando rotas
import TelaAcc from './account/TelaAcc.jsx';
import Lista from "./components/lista-projetos/Lista.jsx";
import Dashboard from './components/dashboard-usuario/Dashboard.jsx';
import FormularioProjeto from './components/formulario-projeto/FormularioProjeto.jsx';

//Adicionando as rotas
const router = createBrowserRouter([
  {
    path: '/', //pagina home é para logar
    element: <App />,
    children: [{
      path: '/',
      element: <TelaAcc />
    }]
  },
  {
    path: 'projetos',
    element: <Lista />
  },
  {
    path: ':grupo',
    element: <Dashboard />
  },
  {
    path: '/projetos/:id',
    element: <></>
  },
  {
    path: '/formulario',
    element: <FormularioProjeto />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)