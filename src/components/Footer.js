import React from "react";

function Footer() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    return (
        <footer>   
            <p style={{fontFamily: 'raleway'}}>Bookscape &copy; • { month }/{day}/{ year }</p> 
        </footer>
    )
}

export default Footer;