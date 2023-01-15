import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Image} from "react-bootstrap" 
import './MainPage.css'
import Footer from '../Footer/Footer'
const MainPage = () => {
  return (
    <div>
      <Footer />
      <div className="container">
      <Image  className='logo' src='/Spotify_Logo_RGB_Green.png' alt=''></Image>
      <div className='text'>
          <h2>This app allows you to create recommended playlist based on artrist you choose </h2>
          <h2>You can <Link to='/search-and-rate-tracks'>
            <Button className='btn' variant="success">Search and rate Tracks 
            </Button>
        </Link> or you can <Link to='/search-and-choose-tracks'>
            <Button className='btn' variant="success" >Search and choose your favourite tracks 
            </Button>
        </Link> Depending on which button is pressed you will be redirected to further configuration of the playlist</h2>
        </div>
        </div>
    </div>
  )
}

export default MainPage

/*
GET www.auta.pl/api/bmw => json
GET www.auta.pl/api/bmw?color=blue&wheels=16 => json

/////// SERVER
let cars = [{
  model: "bmw",
  wheels: 16,
  color: "blue"
},

]

app.get('/api/bmw', (req, res) => {
  const params = req.query
  // params => { color: "blue", wheels: "16"}
  res.json(cars.filter(e=> e.model == "bmw" && e.color == params.color))
})

*/