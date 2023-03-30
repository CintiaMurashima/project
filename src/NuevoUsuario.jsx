import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';


function NuevoUsuario(props) {

    const navigate = useNavigate();

    function guardar(){
        props.guardaItem();
        navigate('/usuarios/lista');
    } 


    return (
        
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={props.name} onInput={e => props.setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={props.email} onInput={e => props.setEmail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={guardar}>
                    Submit
                </Button>
            </Form>

        </>

    )
}

export default NuevoUsuario;




