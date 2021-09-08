import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Img1 from '../../../assets/1.png';
import Img2 from '../../../assets/2.png';
import Img3 from '../../../assets/3.png';

const DemoCarousel = ({ data }) => {
    const [img, setImg] = useState([])
    useEffect(() => {
        if (data.length)
            setImg(data.split(" "))
        else
            setImg([])


    }, [data])

    console.log("data 18", img)
    // let test = ["https://sothebys-md.brightspotcdn.com/0f/31/244afe58459e8d93cf387233501c/hk1117-byd2m-1.jpg", "https://sothebys-md.brightspotcdn.com/ac/bd/b24d57604ef88ba5e267be733b46/hk1117-byd2m-m.jpg"]

    return (


        <Carousel className="carousel-style">
            {
                img && img.length > 0 ? img.map((val, index) => {
                    return (

                        <div style={{ height: '250px' }}>
                            <img src={val} key={index} style={{ height: '100%' }} />
                        </div>
                    )
                }) : null
            }
            {/* <div style={{ height: '250px' }}>
                <img src={Img2} style={{ height: '100%' }} />

            </div>
            <div style={{ height: '250px' }}>
                <img src={Img3} style={{ height: '100%' }} />

            </div> */}
        </Carousel>

    );

};


export default DemoCarousel;