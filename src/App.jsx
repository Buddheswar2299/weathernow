import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//importing bootstrap-react components
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Nav,Navbar,Container } from 'react-bootstrap';

//importing components
import Weather from './components/weather';

function App() {
  

  return (
    <div style={{backgroundColor:"#502ed2",height:"100vh"}}>
       <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <Navbar.Brand href="#home">WeatherNow</Navbar.Brand>
        </Container>
      </Navbar>

     <Weather />
    </div>
  )
}

export default App
