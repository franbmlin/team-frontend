import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import ReviewContext from "./ReviewsContext";

export const ReviewProvider = (props) => {

    const [ reviews, setReviews ] = useState([]);
    const baseUrl = "http://localhost:3000/api/reviews/";

    useEffect(() => {
        async function fetchData() {
            await getAllReview();
        }
        fetchData();
    }, []);

    function getAllReview() {
        return axios.get(baseUrl).then(response => setReviews(response.data));
    }

    function getReview(id) {
        return axios.get(baseUrl + id).then(response => {
                return new Promise((resolve) => resolve(response.data))
            }        
        );  
    }

    function addReview(review) {

        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}` 
        };

        return axios.post(baseUrl, review, { headers: myHeaders })
            .then(response => {
                getAllReview();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function editReview(review) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`
        };

        return axios.put(baseUrl + review.reviewId, review, { headers: myHeaders })
            .then(response => {
                getAllReview();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function deleteReview(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}` 
        };

        return axios.delete(baseUrl + id, { headers: myHeaders })
            .then(response => {
                getAllReview();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }
 

    return (
        <ReviewContext.Provider value={{
            reviews,
            getReview,
            addReview,
            editReview,
            deleteReview
        }}>
            { props.children }
        </ReviewContext.Provider>
    )
};