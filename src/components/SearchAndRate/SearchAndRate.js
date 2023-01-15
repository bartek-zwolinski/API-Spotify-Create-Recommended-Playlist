import React from 'react'
import { useState,  useCallback, useEffect} from 'react';
import { Container, Form, InputGroup, Button, Row, Card } from "react-bootstrap" 
import  useAuth  from '../useAuth/useAuth'
import axios from "axios"
import {Link, useNavigate, useLocation} from 'react-router-dom'
import './SearchAndRate.css'
import Footer from '../Footer/Footer';

const SearchAndRate = () => {

  const [searchInput, setSearchInput] = useState("");
  const [tracks, setTracks] = useState([]);
  const [rate , setRate] = useState([]);
  const [limit, setLimit] = useState(5);
  const {validation} = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const data = location.state

  useEffect(()=>{
    if(data !== null){
      setTracks(data);
    }
  },[data])

  const reset = () => {
    setTracks([]);
    setRate([]);
  }
     
  const ratesOfAlbum = (id,value) => {
    setRate([...rate, [id, value]])
  }

  const getTracks = useCallback(() => {
    axios(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, validation)
    .then(response => response.data)
    .then(data => { return data.artists.items[0].id})
    .then(id => 
      axios(`https://api.spotify.com/v1/recommendations?limit=${limit}&market=ES&seed_artists=` + id , validation)
      )
    .then(response => setTracks(response.data.tracks)) 
  }, [validation,limit,searchInput]);

  return (
    <div>
      <Footer></Footer>
       <Link to='/'>
            <Button className='back' variant="success" >Back home  
            </Button>
        </Link>
      <Container className="d-flex flex-column py-2" >
        <div className="form-group" >
        <InputGroup className='mb-3 ' size='lg'>
            <Form.Control 
                type="search"
                placeholder="Search for Artists"
                value={searchInput}
                onKeyPress={event => {
                    if (event.key === "Enter") {
                        getTracks();
                }}}
                onChange={e => setSearchInput(e.target.value)}
            />
            <Form.Select  onChange={e=> setLimit(e.target.value)}>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={50}>50</option>
            </Form.Select>
            <Button variant="success"
            onClick={getTracks}
            >Search Tracks</Button>
            <Button variant="success"
            onClick={reset}
            >Reset</Button>
        </InputGroup>
        </div>
        <h1 className='page-header'> Don't rate every track as '5' - less 5's means better playlist. If the ratings are less than '4', Search tracks again because you will not receive the playlist </h1>
      </Container>
      <Container className='card-container'>
        <Row className="card-row">
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
                      <Form.Select className='form' onChange={e=> ratesOfAlbum(id, e.target.value)}>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>   
                    </Form.Select>
                    <Link to={`/v1/${id}`} state={tracks}>
                    <Button variant="success" onClick={()=>{
                      nav(`/v1/${id}`, {state: tracks})
                    }}
                    >Listen Track</Button>
                    </Link>
                </Card.Body>
        </Card>
            )
          })}
        </Row>
      </Container>
      <Container className='sub'>
      <Link to='/recommendation-by-value' state={rate}>
        <Button variant="success" onClick={() => {
          nav('/recommendation-by-value', { state:rate});
        }}>Submit  
        </Button>
      </Link>
      </Container>
    </div>
  )
}

export default SearchAndRate

