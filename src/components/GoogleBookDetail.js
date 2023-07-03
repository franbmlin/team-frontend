import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BookContext from '../contexts/BookContext';
import { FaStar } from 'react-icons/fa';
import ReviewContext from '../contexts/ReviewsContext';
import UserContext from '../contexts/UserContext';

function GoogleBookDetail() {

    let navigate = useNavigate();

    //imports from BookProvider
    let { book, setLocalBook } = useContext(BookContext);

    //imports from ReviewProvider
    let { addReview } = useContext(ReviewContext);

    //imports from UserProvider
    let { setisLoggedIn } = useContext(UserContext);

    //Star stuff
    const [ rating, setRating ] = useState(null);
    const [ hover, setHover ] = useState(null);

    //Review data
    const [ review, setReview] = useState({
        userId: null,
        bookId: null,
        starRating: rating,
        comment: ""
    });


    //data for the book via GoogleAPI
    const title = book.volumeInfo.title
    const authors = book.volumeInfo.authors
    const description = book.volumeInfo.description
    const bookPic = book.volumeInfo.imageLinks.thumbnail
    const pubCo = book.volumeInfo.publisher
    const pubDate = book.volumeInfo.publishedDate


    function handleReviewCommentChange(event) {
        setReview((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit (event) {
        event.preventDefault()
        setLocalBook(book).then( bookResponse => {
            addReview({...review, bookId: bookResponse.data.bookId}).then(() => {
                navigate(`/book/${bookResponse.data.bookId}`)
            }).catch(error => {
                console.log(error);
                window.alert(error.response.data);
                setisLoggedIn(false);
                localStorage.clear();
                navigate('/login');
            });
        })
    }


  return (
    <Container style={{paddingBottom: '75px', backgroundColor:'rgba(99, 125, 71, 0.85)'}}>
        <div style={{paddingTop: '15px'}}>
            <h2 style={{fontFamily: 'raleway'}}>Book Detail</h2><br/>
        </div>
        <Row>
            <Col xs={12} sm={12} md={6} lg={4} xl={3} style={{paddingBottom: '25px'}}>
            <img 
                alt=""
                src={bookPic}
                width="275"
                height="325"
                style={{ padding: "5px" }}
            />{" "}
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} xl={4} style={{paddingBottom: '25px'}}>
                <h2 style={{fontFamily: 'raleway'}}>{title}</h2>
                {authors.map((author) => <p style={{fontFamily: 'raleway'}} key={author}>{author}</p>)}
                {pubCo && <p style={{fontFamily: 'raleway'}}>{pubCo}</p>}
                {pubDate && <p style={{fontFamily: 'raleway'}}>{pubDate}</p>}
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={5}>
                {description && <p style={{fontFamily: 'raleway'}}>{description}</p>}
            </Col>
        </Row>
        <Row style={{paddingTop: '25px', paddingBottom: '5px'}}>
            <Col>
                <h3 style={{fontFamily: 'raleway'}}> Reviews </h3>
                <div className="d-flex w-100 justify-content-start">
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label key={ratingValue}>
                                <input
                                    className='starRadio'
                                    type="radio"
                                    name="rating"
                                    value={ ratingValue }
                                    onClick={ () => setRating(ratingValue) }
                                />
                                <FaStar
                                    className='star'
                                    color={ ratingValue <= (hover || rating) ? '#ffc107' : '#A9A9A9' }
                                    size={25}
                                    onMouseEnter={ () => setHover(ratingValue) }
                                    onMouseLeave={ () => setReview({...review, starRating: ratingValue}) }
                                />
                            </label>
                        );
                    })}
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={12} lg={12} xl={12}>
                <form onSubmit={handleSubmit}>
                    <textarea style={{marginTop: '5px', fontFamily: 'raleway'}} placeholder="Write a Review" type="text" rows={4} cols={40} name="comment" value={review.comment} onChange={handleReviewCommentChange}/>
                    <br/>
                    {' '}<Button style={{marginBottom: '15px', marginTop: '5px', backgroundColor: '#070B04', border: '#070B04', fontFamily: 'raleway'}} type='submit' variant="dark">Submit</Button>
                </form>
            </Col>
        </Row>
    </Container>
  )
  
}


export default GoogleBookDetail;