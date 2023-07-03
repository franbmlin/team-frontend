import BookContext from "./BookContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BooksProvider = (props) => {

    const [ search, setSearch ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);

    const googleSearchURL = 'https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyDgI3uNznl3nuYZEutbvQBfi-HTTvAzIy0'+'&maxResults=40';
    const localBookURL = 'http://localhost:3000/api/books/';
    const navigate = useNavigate();

    let [book, setBook] = useState(null);

    const [ localBooks, setLocalBooks ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await getAllLocalBooks();
        }
        fetchData();
    }, []);

    function getAllLocalBooks() {
        return axios.get(localBookURL).then(response => setLocalBooks(response.data));
    }

    function searchHandler(search) {
        setSearch(search);
    }
    
    function bookSearchReturn() {
        axios.get(googleSearchURL)
        .then(res=>setSearchResults(res.data.items))
        .catch(err=>console.log(err))
        navigate('/booklist')
    }

    function getLocalBook(bookId) {
        return axios.get(localBookURL + bookId).then(response => {
            return new Promise(resolve => resolve(response.data));
        })
        .catch(err=>console.log(err));
    };

    async function setLocalBook(book) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`
        };

        //ADD HEADERS INTO POST REQUEST for final run thru **************
        const axiosCall = await axios.post(localBookURL, book, { headers: myHeaders })
        getAllLocalBooks();
        return axiosCall;
    }

    return (
        <BookContext.Provider value={{
            localBooks,
            getLocalBook,
            setLocalBook,
            search,
            searchHandler,
            searchResults,
            bookSearchReturn,
            book,
            setBook,
        }}>
            {props.children}
        </BookContext.Provider>
    )

}