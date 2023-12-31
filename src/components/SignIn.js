import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import "./Home.css";


const SignIn = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let { signInUser } = useContext(UserContext);
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    signInUser(username, password).then(() => {
      navigate('/');
    }).catch(error => {
      console.log(error);
      window.alert(error.response.data);
      navigate('/register')
    });
  }


  return (
    <>
    
    <Container>
      <div className="d-flex justify-content-center" style={{paddingTop: '75px'}}>
        <Row>
          <Col xs='12' sm='12' md='12' lg='12' xl='12' style={{paddingBottom: '20px'}}>
            <h1 style={{textAlign: 'left', fontFamily: 'raleway'}}>LOGIN</h1>
          </Col>
          <Col xs='12' sm='12' md='12' lg='12' xl='12'>
            <Form id='signUpForm' onSubmit={handleSubmit} style={{width: '325px'}}>
                  <Form.Group className="mb-3" >
                      <Form.Label style={{fontFamily: 'raleway'}}>Username:</Form.Label>
                      <Form.Control style={{fontFamily: 'raleway'}} placeholder="Enter Username" type="text" name="username" required onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                      <Form.Label style={{fontFamily: 'raleway'}}>Password:</Form.Label>
                      <Form.Control style={{fontFamily: 'raleway'}} placeholder='Enter Password' type="password" name="password" required onChange={e => setPassword(e.target.value)} />
                  </Form.Group>  
                <Button type="submit" id="saveBtn" style={{backgroundColor: '#070B04', border: '#070B04', fontFamily: 'raleway'}}>Login</Button>
              </Form>
          </Col>
        </Row>
      </div>  
    </Container>
   
    </>
  );
  
}

export default SignIn;
