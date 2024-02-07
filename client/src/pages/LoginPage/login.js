import { useState, useContext, useEffect, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let params = new URLSearchParams(window.location.hash);
        let token = params.get('id_token');
        if(token) {
        }
    }, [])
    
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = {email, password};

        authService.login(requestBody)
            .then(response => {
                storeToken(response.data.authToken)
                authenticateUser()
                navigate("/")
            })
            .catch(error => {
                setErrorMessage(true)
            })
    };

    return (
        
        <Form onSubmit={handleLoginSubmit} role="form">
        <FormGroup>
            <Input placeholder="Email" type="email" value={email} onChange={handleEmail} />
            <Input placeholder="Password" type="password" value={password} onChange={handlePassword} />
        </FormGroup>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
        <Button type="submit">Login</Button>
        </Form>        
    ); 
}

export default Login;