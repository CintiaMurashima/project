import { useEffect, useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './Home';
import ListaUsuarios from './ListaUsuarios';
import NuevoUsuario from './NuevoUsuario';

function App() {

//   const usuarios = [
//     { "id": 1, "nombre": "Quim", "email": "quim@unmail.com" },
//     { "id": 2, "nombre": "Terenci", "email": "terenci@unmail.com" },
//     { "id": 3, "nombre": "Josep", "email": "josep@unmail.com" },
//     { "id": 4, "nombre": "Baltasar", "email": "baltasar@unmail.com" }
// ]

  const URL = 'http://localhost:3000/api/usuarios';

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lista, setLista] = useState([]);


  function getUsers(){
    console.log("cargando...")

    fetch(URL)
      .then(resp => resp.json())
      .then(resp => setLista(resp.data))
      .catch(error=>console.log(error))

    console.log("despues del fetch...",lista)
  }

  useEffect(()=>{
    getUsers();
  }, [])


  function guardaItem() {
    const nuevaLista = [...lista]
    nuevaLista.push({ name, email })
    setLista(nuevaLista)
    
    //reseteando campos
    setName("")
    setEmail("")
    }

  return (
      <BrowserRouter>
    
        <Container>
          <Navbar bg="light" expand="lg">
            <Container>
              <Link to="/" classemail="navbar-brand">APLICACION</Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link to="/" className='nav-link'>Home</Link>
                  <Link to="/usuarios/lista" className='nav-link'>Lista</Link>
                  <Link to="/usuarios/nuevo" className='nav-link'>Nuevo</Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <hr />
          <br />
          <br />

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/usuarios/lista"  element={<ListaUsuarios lista={lista} setLista={setLista} />}/>
            <Route path="/usuarios/nuevo" element={<NuevoUsuario name={name} setName={setName} email={email} setEmail={setEmail} guardaItem={guardaItem}/>} />
          </Routes>

        </Container>
      </BrowserRouter>
  )
}

export default App
