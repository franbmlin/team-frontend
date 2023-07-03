import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ReviewContext from "../contexts/ReviewsContext";
import { FaStar } from 'react-icons/fa';
import UserContext from "../contexts/UserContext";


function EditReview() {

    let {id} = useParams();
    let navigate = useNavigate();
    let {editReview, getReview } = useContext(ReviewContext);
    let { setisLoggedIn } = useContext(UserContext);

    let [editThisReview, setEditThisReview] = useState({
        comment: "",
        starRating: "",
        userId: getReview.userId
    })

    const [ rating, setRating ] = useState(null);
    const [ hover, setHover ] = useState(null);

    useEffect(() => {
        async function fetch() {
          await getReview(id)
            .then((reviews) => setEditThisReview(reviews))
          }
          fetch()
    },  [getReview, id])

    function handleChange(event) {
        setEditThisReview((prevValue) => {
            return {...prevValue, [event.target.name]: event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        editReview(editThisReview).then(() => {
            navigate(`/profile/${editThisReview.userId}`)
            alert('Update was successful!');
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
        () => {
            return (
                <Container style={{backgroundColor:'rgba(99, 125, 71, 0.85)'}}>
                <div style={{paddingTop: '15px'}}>
                <h2 style={{fontFamily: 'raleway', paddingLeft: '50px'}}>Edit Review</h2><br/>
                    <form onSubmit={handleSubmit} style={{paddingLeft: '50px', paddingTop: '15px'}}>
                        <span style={{fontWeight: 'bold', color: 'whitesmoke', fontFamily: 'raleway'}}>Star Rating:</span><br/>
                        <div className="d-flex w-100 justify-content-start">
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                    return (
                                        <label key={ratingValue} style={{paddingBottom: '20px'}}>
                                            <input
                                                className='starRadio'
                                                type="radio"
                                                name="rating"
                                                value={ ratingValue }
                                                onClick={ () => setRating(ratingValue) && handleChange}
                                            />
                                            <FaStar
                                                className='star'
                                                color={ ratingValue <= (hover || rating) ? '#ffc107' : '#A9A9A9' }
                                                size={25}
                                                onMouseEnter={ () => setHover(ratingValue) }
                                                onMouseLeave={ () => setEditThisReview({...editThisReview, starRating: ratingValue}) }
                                            />
                                        </label>
                                    );
                            })}
                        </div>
                        <span style={{fontWeight: 'bold', color: 'whitesmoke', fontFamily: 'raleway'}}>Review:</span><br/>
                        <textarea style={{fontFamily: 'raleway'}} type="text" name="comment" rows={3} cols={40} value={editThisReview.comment} onChange={handleChange} />
                        <br></br><br></br>
                        <Button type='submit' style={{marginBottom: '5px', backgroundColor: '#070B04', border: '#070B04', fontFamily: 'raleway'}}>Update</Button>
                    </form>
                    
                </div>
                <div style={{paddingBottom: '432px'}}>

                </div>
                </Container>
                
            )
        }
        }
        </ReviewContext.Consumer>
    )

}
  
export default EditReview;