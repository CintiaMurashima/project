import { useEffect, useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './Home';
import ListaUsuarios from './ListaUsuarios';
import NuevoUsuario from './NuevoUsuario';

function App() {

  const URL = 'http://localhost:3000/api/usuarios';

  const [index, setIndex] = useState(-1);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lista, setLista] = useState([]);


  function getUsers() {
    fetch(URL)
      .then(resp => resp.json())
      .then(resp => setLista(resp.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getUsers();
  }, [])


  function borraItem(x) {
    const nuevaLista = [...lista]
    setId(lista[x].id)
    console.log("delete",id)
    deleteUsu(id);
    nuevaLista.splice(x, 1)
    setLista(nuevaLista)
  }

  function editaItem(x) {
    setIndex(x)
    console.log("index edita",index)
    setId(lista[x].id)
    setName(lista[x].name)
    setEmail(lista[x].email)
  }

  function guardaItem() {
    const nuevaLista = [...lista]
    if (index > -1) {
      console.log("entra a guardarITEM", index, name, email)
      //estamos editando
      nuevaLista[index].name = name
      nuevaLista[index].email = email
      console.log("id", id, name, email)
      editar(id);
    } else {
      //registro nuevo
      nuevaLista.push({ name, email })
      guardarUsu(name, email);
    }

    //actualizando lista
    setLista(nuevaLista)
    //reseteando campos
    setId()
    setName("")
    setEmail("")
    setIndex(-1)
  }

  function deleteUsu(id){
    console.log("index delete",id, (URL + "/" + id))
    fetch((URL + "/" + id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id,name, email})
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  
  function guardarUsu(name, email) {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email })
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  function editar(id) {
    fetch((URL+"/"+ id ), {
      method: 'PUT',
      body: JSON.stringify({name, email}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(date => {
        console.log('Success:', date);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
          <Route path="/" element={<Home />} />
          <Route path="/usuarios/lista" element={<ListaUsuarios lista={lista} setLista={setLista} borraItem={borraItem} editaItem={editaItem} />} />
          <Route path="/usuarios/nuevo" element={<NuevoUsuario name={name} setName={setName} email={email} setEmail={setEmail} guardaItem={guardaItem} />} />
        </Routes>

      </Container>
    </BrowserRouter>
  )
}

export default App
