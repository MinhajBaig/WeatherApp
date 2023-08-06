import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import "./Weather.css"
import Navbar from 'react-bootstrap/Navbar';
import TextField from '@mui/material/TextField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShareSquare } from 'react-icons/fa'
import { HiOutlineSun } from 'react-icons/hi'
import Card from 'react-bootstrap/Card';



function WeatherData() {

    const [weather, setWeather] = useState([]);
    const [country, setCountry] = useState("")

    const handleInputChange = (e) => {
        setCountry(e.target.value);
    }

    const weatherApiFetch = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://pro.openweathermap.org/data/2.5/weather?q=${country}&appid=3500aa8ab775cb0cb97ead2b9fc41866&units=metric`,
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const response = await axios.request(config);
            setWeather([response.data]);
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        weatherApiFetch();
    }, [country]); // Fetch weather data whenever the country changes

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container className="nav">
                    <TextField id="standard-basic" label="ENTER YOUR CITY NAME"
                        className="searchbar" color="warning" variant="standard"
                        value={country} onChange={handleInputChange}
                    />

                    <Navbar.Brand href="#home" className="mainheading" >Weather App</Navbar.Brand>
                </Container>
            </Navbar>

            {Array.isArray(weather) ? (
                weather.map((v, i) => (
                    <div className='details ' key={i}>

                        {[
                            'Dark'
                        ].map((variant) => (
                            <Card
                                bg={variant.toLowerCase()}
                                key={variant}
                                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                                style={{ width: '18rem' }}
                                className="mb-2 cardlayout"
                            >
                                <Card.Header style={{ fontSize: "30px", textAlign: "center" }}> {v.name} {v.sys.country} </Card.Header>

                                <Card.Body>
                                    <Card.Title>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <HiOutlineSun className='sun' size={90} />
                                            &emsp;
                                            <span style={{ fontSize: "70px", fontFamily: "cursive" }} >{Math.round(v.main.temp)}°<sup>c</sup></span>
                                            <br /> <br />
                                        </div>
                                    </Card.Title>

                                    <Card.Text>
                                        <p style={{ fontSize: "70px", fontFamily: "cursive" }} >feels like <br />
                                            {Math.round(v.main.feels_like)}° <sup>c</sup></p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        ))}

                        <Row>
                            <Col className="atmosphere">
                                <h1 style={{marginTop: "50px",marginBottom: "30px"}}>Wind Speed: {v.wind.speed}</h1>
                                <h1>Wind Deg: {v.wind.deg}</h1>
                            </Col>

                            <Col className="atmosphere">
                                <h1 >Pressure: {v.main.pressure}</h1>
                                <h1>Min_temp: {v.main.temp_min}</h1>
                                <h1>Max_temp: {v.main.temp_max}</h1>
                                <h1>Humidity :{v.main.humidity}</h1>
                            </Col>

                            <Col className="atmosphere">
                                <h1 style={{marginTop: "20px",marginBottom: "20px"}}>Longitude: {v.coord.lon}</h1>
                                <h1 >Latitude: {v.coord.lat}</h1>
                            </Col>
                            {/* Display other weather details here */}
                        </Row>

                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}


export default WeatherData