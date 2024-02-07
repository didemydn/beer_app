import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
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

function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        const requestBody = {email, password, name}

        authService.signup(requestBody)
            .then(response => {
                console.log('response', response)
                navigate("/user/login")
            })
            .catch(err => console.log(err))
    };

    return(
        <>    
        <FormGroup>
            <input placeholder="Fullname" type="text" value={name} onChange={handleName} />
            <input placeholder="email" type="text" value={email} onChange={handleEmail} />
            <input placeholder="password" type="text" value={password} onChange={handlePassword} />
        </FormGroup>        
        <Button type="button" onClick={handleSignupSubmit}>Create Account</Button>
        </>    
    )
}

export default Signup;