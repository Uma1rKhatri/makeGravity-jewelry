import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Img1 from '../../../assets/1.png';
import Img2 from '../../../assets/2.png';
import Img3 from '../../../assets/3.png';

const DemoCarousel = () => {

    return (


        <Carousel className="carousel-style">
            <div  >
                <img src={Img1} className="img-stl" />

            </div>
            <div>
                <img src={Img2} className="img-stl" />

            </div>
            <div>
                <img src={Img3} className="img-stl" />

            </div>
        </Carousel>

    );

};


export default DemoCarousel;