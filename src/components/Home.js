import React, { useContext, useRef, Fragment, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { Link, Outlet } from "react-router-dom";
import BookContext from "../contexts/BookContext";
import "./Home.css";
import logo from './assets/Bookscape.png'
import arrow from './assets/arrow.png'
import Footer from "./Footer";
import UserContext from "../contexts/UserContext";
import { FaUser } from 'react-icons/fa';


function Home() {

  const ClickIt = () => {
    document.getElementById("Clickbutton").click();
  };

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        ClickIt();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const inputElement = useRef('');

  const { search, searchHandler, bookSearchReturn } = useContext(BookContext);
  const { loggedInUser, isLoggedIn, signOutUser } = useContext(UserContext);

  function getSearchTerm() {
    searchHandler(inputElement.current.value);
  }

  
  const authLink = (
    <Fragment>
        <Link style={{fontFamily: 'raleway'}} onClick={ signOutUser } className="nav-link">
          <span className="hide-sm"> Logout</span>
        </Link>
        <Link style={{fontFamily: 'raleway'}} to={`/profile/${loggedInUser.userId}`} className="nav-link">
          <div>
            <FaUser style={{marginRight: '2px'}}/>
            Hello { loggedInUser.firstName }!
          </div>
        </Link>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <Link style={{fontFamily: 'raleway'}}  to="/register" className="nav-link">
        Register
      </Link>
      <Link style={{fontFamily: 'raleway'}}  to="/login" className="nav-link">
        Login
      </Link>
    </Fragment>
  );

  return (
    <>
      <Navbar className="Navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand className="logo">
            <Link style={{fontFamily: 'raleway'}}  to="/" className="nav-link">
                <img
                  alt=""
                  src={logo}
                  width="50"
                  height="50"
                  style={{ padding: "5px" }}
                />{" "}
                Bookscape
              </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" style={{backgroundColor:'#637D47'}} />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link style={{fontFamily: 'raleway'}}  to="/" className="nav-link">Home</Link>
              <Link style={{fontFamily: 'raleway'}}  to="/about" className="nav-link">About</Link>
              <>
               { isLoggedIn === true ? authLink : guestLink }
              </>
            </Nav>
            <div>
              <p style={{fontFamily: 'raleway', paddingTop: '20px', paddingRight: '15px'}}>Your next adventure awaits</p>
            </div>
            <img id='arrow' style={{paddingRight: '5px'}} src={arrow} width= '150px' height='50px' alt="arrow pointing right"></img>
            <Form className="d-flex">
              <Form.Control
                ref={ inputElement }
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="search"
                value={ search }
                onChange={ getSearchTerm }
                style={{fontFamily: 'raleway'}}
              />
              <Button id="Clickbutton" onClick={bookSearchReturn} style={{backgroundColor: '#637D47', border: '#637D47', fontFamily: 'raleway'}}>Find</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Stack>
        <Outlet />
      </Stack>
      <Footer />
    </>

    
   
  );
}

export default Home;
