//Ponto onde as paginas serão inseridas
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <section>
        <header>
            <h1>Bem vindo ao sistema de projetos da UNIFEI</h1>
        </header>
        <Outlet/>
    </section>
    </>
  )
}

export default App