import React, { useEffect, useState }  from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Card,Container,Form,Row,Col } from 'react-bootstrap';
//importing images from assets
import clear from '../assets/clear.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import snow_icon from '../assets/snow.png'
import rain_icon from '../assets/rain.png'
import cloud_icon from '../assets/cloud.png'


export default function Weather(){
    const [city,setCity] = useState('')
    const [weatherData , setWeatherData] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(()=>{
        if(city){
            getWeatherData(city)
        }else{
            getWeatherData('kurnool')
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
        
        console.log(city)
        if(city){
            getWeatherData(city)
        }else{
            window.alert('Enter city name')
        }  
    }
    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,
        '50d': snow_icon,
        "50n": snow_icon
    }
    
    const getWeatherData = async(cityName)=>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=5bd30c538db141803e0d4a3fce8440ba`
            let response = await axios.get(url)
            console.log(response.data.weather[0].icon)
            console.log(response.data)
            let icon = allIcons[response.data.weather[0].icon]
            setWeatherData({
                temp : response.data.main.temp,
                humidity:response.data.main.humidity,
                wind : response.data.wind.speed,
                currentCity: response.data.name,
                icon: icon
                
            })
            if(response){
                setCity('')
            }

        }catch(error){
            // setErrorMessage('Enter ')
            window.alert('city not found')
            setCity('')
        }
       
        
    }

  
    
 

    return(

        <div style={{display:"flex",justifyContent:"center",alignContent:"center",marginTop:"10%"}}>
            <Card style={{ width: '50%',backgroundColor:"#e5deff" }}>

                
                <Form style={{padding:"12px"}} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail" style={{display:'flex',justifyContent:"center",marginRight:"6px"}}>
                        
                        <Form.Control type="text" placeholder="Enter City" 
                         style={{width:"50%",padding:"10px",marginRight:"6px"}}
                          value={city}
                          onChange={(e)=>setCity(e.target.value)}
                          
                          />
                        <Button type='submit'>Search</Button>
                    </Form.Group>
                </Form>
                {/* <input type="text" placeholder="Enter city name" /> */}
                <Card.Body>
                <Card.Img variant="top" src={weatherData.icon} style={{margin:'auto',display:"block",height:"200px",width:"200px"}}/>
                    <Container style={{display:'flex',justifyContent:"center"}}>
                        <div>
                        <Card.Title style={{}}>{weatherData.temp} &deg;C</Card.Title>
                        <Card.Title>{weatherData.currentCity}</Card.Title>
                        </div>
                    </Container>
                    
                    <Container style={{marginTop:"12px"}}>
                        <Row >
                            <Col style={{display:'flex',justifyContent:"center"}}>
                                <Card.Img variant="top" src={humidity}  style={{height:"50px",width:"50px",marginRight:"6px"}}/>
                                <div>
                                    <Card.Title>{weatherData.humidity}%</Card.Title>
                                    <Card.Text>humidity</Card.Text>
                                </div>
                            </Col>
                            <Col style={{display:'flex',justifyContent:"center"}}>
                                <Card.Img variant="top" src={wind}  style={{height:"50px",width:"50px",marginRight:"6px"}}/>
                                <div>
                                    <Card.Title>{weatherData.wind}km/h</Card.Title>
                                    <Card.Text>wind</Card.Text>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    
                </Card.Body>
            </Card>
            
        </div>
    )
}