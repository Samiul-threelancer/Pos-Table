import React, { useState, useEffect } from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
// import { IconName } from "react-icons/fa";
// import Dropdown from 'react-bootstrap/Dropdown';
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Card from 'react-bootstrap/Card';
// import  CardGroup  from 'react-bootstrap/CardGroup';
const About = () => {

    const [arrData, setArrData] = useState([]);

    useEffect(() => {

        // abort controller 
        const ac = new AbortController();


        // response
        try {

            ( async () => {
                 await axios.get(`https://fakestoreapi.com/products`, { signal: ac.signal }).then((response)=>{
                    setArrData(response?.data)
                 }

                 )
                    
            })()

            // error exception
        } catch (err) {
            console.warn(err.response.data.message)
        }

        // unsubscription
        return () => ac.abort();


    }, [])

    console.log("arrData", arrData)


    const bookingHandle = () => {
        console.warn("Are you ready to book our Air tickets");
        setShow(true)
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    return (
        <>
            <div className='parent-class'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="pictures d-block w-100"
                            src="/images/image1.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption className='caption'>
                            <h3 className='title'>Book online and begin your dream holyday</h3>
                            <p className='description'>Travel with the Airline of the Year </p>
                            <Button variant="primary" className='picture-button' onClick={bookingHandle}>Book now</Button>{' '}
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Yaahoo Big Offer</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    It's 20% of off tickets price to all of our Economic Class. Book to  your ticket. Happy Journey......
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary">Understood</Button>
                                </Modal.Footer>
                            </Modal>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className=" pictures d-block w-100 "
                            src="/images/images3.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption className='caption'>
                            <h3 className='title'>Book online and begin your dream holyday</h3>
                            <p className='description'>Travel with the Airline of the Year</p>
                            <Button variant="primary" className='picture-button' onClick={bookingHandle}>Book now</Button>{' '}
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Yaahoo Big Offer</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    It's 20% of off tickets price to all of our Economic Class. Book to  your ticket. Happy Journey......
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary">Understood</Button>
                                </Modal.Footer>
                            </Modal>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className=" pictures d-block w-100 "
                            src="/images/image2.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption className='caption'>
                            <h3 className='title'>Book online and begin your dream holyday</h3>
                            <p className='description'> Travel with the Airline of the Year</p>
                            <Button variant="primary" className='picture-button' onClick={bookingHandle}>Book now</Button>{' '}
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Yaahoo Big Offer</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    It's 20% of off tickets price to all of our Economic Class. Book to  your ticket. Happy Journey......
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary">Understood</Button>
                                </Modal.Footer>
                            </Modal>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <main className='container'>
                {/* Start card section */}
                <section className='container mt-5'>
                    <div className='d-flex align-items-center justify-content-between flex-wrap'>
                        {arrData.slice(0, 9).map((item, i) => {
                            return (
                                <div className=" parent-class row  col-md-4 col-sm-12 g-4 mt-2 ">
                                    <div className="col">
                                        <div className=" sub-class card shadow-lg rounded-3">
                                            <img src={item.image} className=" images card-img-top mt-5" alt="..." />
                                            <div className="card-body">
                                                <h2 className="card-title text-primary">{item.title}</h2>
                                                <p className="card-text"> { item.description.slice(0, 15) }..... </p>
                                                <p className="card-text"> Category { item.category } </p>
                                                <p className="card-price"> Price { item.price } </p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                        }

                        <br />
                    </div>
                    <br />
                </section> <br />
                {/* End Card Section  */}

                <section>
                    <div className=' fare-details mt-5'>
                        <div className="sub-fare-details">
                            <div className="fare-title">
                                <h1 className='fare-text mt-5 '>Find Grate Fares</h1>
                            </div>
                           <div className="sub-header">
                                <div className="dropdown-fares d-flex mt-5">
                                    <div className="from-fares">
                                            <h3>From</h3>
                                    </div>

                                        <div className="dropdown">
                                            <input type="text" id='dropDown' className='dropbtn' required-autoComplete='off' spellCheck="false" placeholder='Dhaka DAC' />

                                            <div class="dropdown-content">
                                                <h3>Airport/City not found</h3>
                                                <p className=' dropdown-description mb-5'>Please check again the airport,city, country or country airpod code you have entered or select one from the list</p>                                        
                                            </div>                                  
                                            
                                            
                                        </div> 
                                    
                                    </div> <br />
                               
                                <Link to='' className=' item '>
                                <div className="best-price mt-5">
                                    <div className="icon-title mt-2">

                                        <h4>Best Price Guagarantee </h4>
                                    </div>
                                    <div className="Icon ">

                                        <svg className='sav' xmlns="http://www.w3.org/2000/svg" width="35" height="35" color=' #5c0931'  fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                    </div>
                                    
                                </div>

             
                                </Link>
                           </div>


                        </div>

                    </div>
                    
                    <br /> <br /> <br />
                    
                </section>
                

            </main>
        </>



    )
}

export default About