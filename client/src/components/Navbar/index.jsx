import {Link} from "react-router-dom"
import {Navbar, Container, Tab, Modal, Nav} from "react-bootstrap"
import Auth from "../../utils/auth"
const myNav=()=>{

    return(
        <>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand as ={Link} to="/">
                Alex's Book search
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar"/>
                <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
                    <Nav className="ml-auto d-flex">
                    <Nav.Link as={Link} to="/">
                    Search a  Book
                    </Nav.Link>

                {
                    Auth.isLoggedIn() ?(
                        <>
                        <Nav.link as={Link} to="/savedBooks">
                        </Nav.link>
                        <Nav.Link onClick={Auth.removeToken}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                        <Nav.Link>LogIn/Signup</Nav.Link>
                        </>
                    )
                }
                    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}

export default myNav