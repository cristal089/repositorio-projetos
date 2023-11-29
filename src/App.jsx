//Ponto onde as paginas serão inseridas
import { Outlet } from 'react-router-dom'
import "./App.css"

function App() {

  return (
    <>
      <section>
        <header>
            <h1>Bem vindo ao sistema de projetos da UNIFEI</h1>
        </header>
        <main>
          <a href="http://localhost:5173/projetos">Projetos</a>
        </main>
        <Outlet/>
    </section>
    </>
  )
}

export default App