import Table from 'react-bootstrap/Table';

function ListaUsuarios(props) {

  

    const listaFilas = props.lista.map((el, index) => (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{el.name}</td>
          <td>{el.email}</td>
        </tr>))
    
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {listaFilas}
                </tbody>
            </Table>
        </>

    )
}

export default ListaUsuarios;

