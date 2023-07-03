import React, { useContext, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import "./Home.css";


const SignUp = () => {
    let [ newUser, setNewUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        createUser(newUser).then(() => {
            navigate('/login');
        }).catch(error => {
            console.log(error);
            console.log(newUser);
            window.alert('Failed registration: ' + error.response.data);
        });
    }

    return (
        <Container>
            <div className="d-flex justify-content-center" style={{paddingTop: '65px'}}>
                <Row>
                    <Col xs='12' sm='12' md='12' lg='12' xl='12' style={{paddingBottom: '20px'}}>
                        <h1 style={{fontFamily: 'raleway'}}>REGISTER</h1>
                    </Col>
                    <Col xs='12' sm='12' md='12' lg='12' xl='12'>
                        <Form id='signUpForm' onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label style={{fontFamily: 'raleway'}}>Username:</Form.Label>
                                <Form.Control style={{fontFamily: 'raleway'}} placeholder='Enter Username' type="text" name="username" required value={newUser.username} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label style={{fontFamily: 'raleway'}}>Password:</Form.Label>
                                <Form.Control style={{fontFamily: 'raleway'}} placeholder='Enter Password' type="password" name="password" required value={newUser.password} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label style={{fontFamily: 'raleway'}}>First Name:</Form.Label>
                                <Form.Control style={{fontFamily: 'raleway'}} placeholder='Enter First Name' type="string" name="firstName" required value={newUser.firstName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label style={{fontFamily: 'raleway'}}>Last Name:</Form.Label>
                                <Form.Control style={{fontFamily: 'raleway'}} placeholder='Enter Last Name' type="text" name="lastName" required value={newUser.lastName} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label style={{fontFamily: 'raleway'}}>Email:</Form.Label>
                                <Form.Control style={{fontFamily: 'raleway'}} placeholder='Enter Email' type="text" name="email" required value={newUser.email} onChange={handleChange} />
                            </Form.Group>
                            <Button type="submit" id="saveBtn" style={{backgroundColor: '#070B04', border: '#070B04', fontFamily: 'raleway'}}>Register</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        
        </Container>
    )
        
    
};

export default SignUp;
 
 

