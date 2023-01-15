import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { Container, Form, Button, Row, Card} from 'react-bootstrap'
import  useAuth  from '../useAuth/useAuth'
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../Footer/Footer';
import './RecommendationByChoosing.css'

const RecommendationByChoosing = () => {

    const [limit, setLimit] = useState(10);
    const [tracks , setTracks] = useState([]);
    const [idOfTracks, setIdOfTracks] = useState('');
    const location = useLocation();
    const data = location.state
    const {validation} = useAuth();

    useEffect(()=>{
      const ids = data.reduce((acc,cur) => {
        return acc + '%2C' + cur
      },[])
      if (ids.length !== 0){
        setIdOfTracks(ids.substring(3))
      } 
    }, [data])

    const getTracks = useCallback(() => {
      axios(`https://api.spotify.com/v1/recommendations?limit=${limit}&market=ES&&seed_tracks=${idOfTracks}&min_popularity=50`, validation)
      .then(response => response.data)
      .then(data => data.tracks)
      .then(tracks => setTracks(tracks))
      }, [validation, idOfTracks,limit]);

  if(idOfTracks.length === 0) {
    return (
    <div>
      <Footer></Footer>
      <h1 className='pages'> If you want to get recommendation, you should add at least one track to favourite</h1>
        <Link to="/search-and-choose-tracks">
         <Button className='backs-home' variant="success">Back Home</Button>
        </Link> 
    </div>
    )
  } else {

      return (
    <div>
      <Footer></Footer>
       <Link to='/search-and-choose-tracks'>
         <Button  variant="success"
         >Back Home</Button>
        </Link> 
        <h1 className='page-head'> Set limit of Tracks then press 'Create Playlist'</h1>
        <Form.Select className='form' onChange={e=> setLimit(e.target.value)}>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
            </Form.Select>
            <Button className='create'variant="success" onClick={getTracks}>Create Playlist</Button>
            <Container>
            <Row className="card-rows">
          {tracks.map((track) => {
            const { name, id } = track;
            return (
        <Card className='card' key={id}>
          <Card.Header>{name}</Card.Header>
            <Card.Img className='img' src={track.album.images[0].url}/>
                <Card.Body className='card-body'>
                    <Card.Title>Track info:</Card.Title>
                    <Card.Subtitle>Name: <br></br><span>{name}</span></Card.Subtitle>
                    <Card.Subtitle>Album Type: <br></br><span>{track.album.album_type}</span></Card.Subtitle>
                    <Card.Subtitle>Album Name: <br></br><span>{track.album.name}</span></Card.Subtitle>
                    <Card.Subtitle>Artists: </Card.Subtitle>
                    {track.artists.map((artist) => {
                     return <Card.Subtitle className='art' key={artist.id}><span>• {artist.name}</span> </Card.Subtitle>   
                    })}  
                    <Card.Subtitle className='info'>Info based on Spotify Api</Card.Subtitle>    
                </Card.Body>
        </Card>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}
}

export default RecommendationByChoosing
