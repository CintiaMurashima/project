import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";


function ListaUsuarios(props) {

    const navigate = useNavigate();

    function edita(index){
        props.editaItem(index);
        navigate('/usuarios/nuevo/');
    }

    const listaFilas = props.lista.map((el, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{el.name}</td>
            <td>{el.email}</td>
            <td>
                <Button size="sm" variant="primary" onClick={() => edita(el.id)} >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button size="sm" variant="danger" onClick={() => props.borraItem(index)} >
                    <FontAwesomeIcon icon={faTrashCan} />
                </Button>
            </td>

        </tr>))

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
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

