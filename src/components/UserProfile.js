import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReviewContext from '../contexts/ReviewsContext';
import UserContext from '../contexts/UserContext';



function UserProfile() {

    let {id} = useParams();
    let navigate = useNavigate();

    let { getUserProfile, loggedInUser, setisLoggedIn } = useContext(UserContext);
    let { deleteReview } = useContext(ReviewContext);
    
    let [getUser, setGetUser] = useState("")
    

    useEffect(() => {
        async function fetch() {
          await getUserProfile(id)
            .then((getUser) => {
                setGetUser(getUser)
            }).catch(error => {
                console.log(error);
                window.alert(error.response.data + 'to view this profile');
                setisLoggedIn(false);
                localStorage.clear();
                navigate('/login');
            })
          }
          fetch()
    },  [getUserProfile, id, navigate])

    function handleDelete(id) {
        deleteReview(id).then(() => {
            navigate(`/profile/${getUser.userId}`)
        }).catch(error => {
            console.log(error);
            setisLoggedIn(false);
            localStorage.clear();
            navigate('/login');
        });
    }


    return (
        <ReviewContext.Consumer>
            {
                ({reviews}) => {
                    return <>
                    <Container style={{paddingBottom: '75px', backgroundColor: 'rgba(99, 125, 71, 0.85)'}}>
                        <Row style={{paddingTop: '25px'}}>
                            <Col xs={3} md={6} lg={4} xl={4}>
                                <h1 style={{fontFamily: 'raleway'}}>{getUser.username}</h1>
                                <p  style={{paddingLeft: '5px', fontFamily: 'raleway'}}>{getUser.firstName}{' '}{getUser.lastName}</p>
                                <p  style={{paddingLeft: '5px', fontFamily: 'raleway'}}>{getUser.email}</p>
                            </Col>
                        </Row>
                        <Row style={{paddingTop: '50px'}}>
                            <Col>
                                <h4 style={{fontFamily: 'raleway'}}> Reviews by {getUser.username}</h4>
                            </Col>
                        </Row>
                        {
                            reviews.map((r) => {
                            return (
                                <>
                                    {getUser.userId === r.userId && 
                                    <>
                                    <Row key={r.reviewId}>
                                        <Col xs={12} md={12} lg={12} xl={12}>
                                            <ListGroup className="align-self-start w-80">
                                                <ListGroup.Item style={{ padding: '15px', margin: '25px', marginLeft: '3px', textAlign: 'left', paddingBottom: '2px', backgroundColor: '#13200D' }}>
                                                    <Row>
                                                        <Col xs={3} sm={3} md={2} lg={2} xl={1}>
                                                            <img 
                                                                alt=""
                                                                src={r.Book.imageLinks.thumbnail}
                                                                width="105"
                                                                height="130"
                                                                style={{ padding: "5px" }}
                                                            />{" "}
                                                        </Col>
                                                        <Col xs={6} sm={6} md={8} lg={8} xl={9} style={{paddingLeft: '35px'}}>
                                                            <div className="d-flex w-100 justify-content-start" style={{paddingBottom: '13px'}}>
                                                                <Link to={`/book/${r.Book.bookId}`} className='ml-auto me-2' style={{color: 'white', fontFamily: 'raleway'}}>{r.Book.title}</Link>
                                                                
                                                                {[...Array(r.starRating)].map((star, i) => {
                                                                        let counter = i + 1;
                                                                        return(
                                                                            <FaStar
                                                                                value={counter}
                                                                                color={'ffc107'}
                                                                            />
                                                                        )
                                                                    })}

                                                            </div>
                                                            <div>
                                                                <p className="mb-1" style={{paddingBottom: '5px', fontFamily: 'raleway'}}>{r.comment}</p>
                                                            </div>
                                                        </Col>
                                                        <Col xs={3} sm={3} md={2} lg={2} xl={2}>
                                                            <div className="d-flex w-100 justify-content-end">
                                                                {loggedInUser && loggedInUser.userId === r.userId && <Link to={`/edit/${r.reviewId}`} className='ml-auto me-2'  style={{color: 'white', fontFamily: 'raleway'}}>Edit</Link>}{' '}
                                                                {loggedInUser && loggedInUser.userId === r.userId && <Link style={{color: 'white', fontFamily: 'raleway'}} onClick={handleDelete.bind(this, r.reviewId)}>Delete</Link>}{' '}   
                                                            </div>

                                                        </Col>  
                                                    </Row>
                                                    <Row>
                                                        <Col className="d-flex w-100 justify-content-end" style={{paddingBottom: '5px'}}>    
                                                            <Link style={{fontFamily: 'raleway'}} to={`/profile/${r.userId}`} className="nav-link">{r.User.username}</Link> 
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                    </>
                                    }
                                </>
                            )
                        })}

                    </Container> 

                    </>
                }
            }
        </ReviewContext.Consumer>  
    )
  
}


export default UserProfile;