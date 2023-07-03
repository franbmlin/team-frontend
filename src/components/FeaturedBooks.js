import { useContext } from "react";
import { Card, Container, Row, Stack } from 'react-bootstrap';
import "./Home.css";
import { Link, Outlet } from "react-router-dom";
import BookContext from "../contexts/BookContext";
import forest from './assets/background-image.jpeg'

function FeaturedBooks() {

    let { localBooks } = useContext(BookContext)

    function localBookList() {

        return (
            <Container style={{paddingBottom: '75px', backgroundImage: `url(${forest})`}}>
                <h1 style={{paddingTop: '25px', paddingLeft: '7px', paddingBottom: '10px', fontFamily: 'raleway'}}>Featured Books</h1>
                <div id="CardsCol">
                    <Row>
                    {localBooks.map((b) => (
                        <Card key={b.bookId} id="CardBorder" style={{width: '18rem', padding: '15px', margin: '20px', textAlign: 'left', paddingBottom: '2px' }}>
                            <Card.Img variant="top" src={b.imageLinks.thumbnail} className="card-img-top" height='350'/>
                            <Card.Body>
                                <Card.Title style={{fontFamily: 'raleway'}}>{b.title}</Card.Title>
                                {b.authors.map((author) => <Card.Text style={{fontFamily: 'raleway'}} key={author}>{author}</Card.Text>)}
                                <Link to={`/book/${b.bookId}`} style= {{color: '#070B04', fontFamily: 'raleway'}}>Book Detail</Link>
                            </Card.Body>
                        </Card>
                    ))}
                    </Row>
                </div>
            </Container>
        )
          
    }
    
            
    return (

       
        <>
            <Stack direction="vertical" gap={1}>
                <BookContext.Consumer>
                    {({localBooks}) =>
                    localBookList(localBooks)
                    }
                </BookContext.Consumer>
                <Outlet />
            </Stack>
        </>
        


        
    )

}     

export default FeaturedBooks;