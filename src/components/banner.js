import React from 'react';

function Banner() {
    const url = 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' //This is a place holder image
    return (
        <img src={url}
            style={{
                margin: "auto",
                left: "37.8%",
                // width: "100%",
                float: "left",
                height: 250,
                position: "absolute"
            }}
            alt='Background' />
    );
}

export default Banner;