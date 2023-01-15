import React, { useEffect } from 'react'
import { useState,  useCallback} from 'react';
import { Container, Form, InputGroup, Button, Row, Card } from "react-bootstrap" 
import  useAuth  from '../useAuth/useAuth'
import axios from "axios"
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './SearchAndChoose.css'
import Footer from '../Footer/Footer';

const SearchAndChoose = () => {

  const [searchInput, setSearchInput] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
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
    setSearchInput('');
  }

  const addTrackToFav = (id) => {
    if(selectedTracks.includes(id)){
      toast.error('Track is already added', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        }); 
    } else if(selectedTracks.length >=4){
      toast.error('Maximum you can add 4 tracks', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        }); 
    }
    else {
      setSelectedTracks([...selectedTracks, id])
    
    }
  }

  const handleRemoveItem = (id) => {
    setSelectedTracks(selectedTracks.filter(item => item!== id));
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
        <InputGroup className='mb-3' size='lg'>
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
            <Form.Select onChange={e=> setLimit(e.target.value)}>
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
        <h1 className='page-headers'> Choose your favourite tracks from recommendations. It is required to choose max 4 Tracks </h1>
      </Container>
      <Container>
      <Row className="cards-row">
          {tracks.map((track) => {
            const { name, id } = track;
            let isSelected = selectedTracks.includes(id) ? true : false
            return (
        <Card className='card' style={{background: isSelected ? ' rgb(170, 230, 184)' : 'rgb(209, 219, 206)'}} key={id}>
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
                    <div className='btn-row'>   
                    <Button variant="success" onClick={e=> addTrackToFav(id)}>Add Track</Button>
                    <Button  variant="success" onClick={e => handleRemoveItem(id)}>Remove Track</Button>
                    <Link to={`/v2/${id}`} state={tracks}>
                    <Button className='succ'variant="success" onClick={()=>{
                      nav(`/v2/${id}`, {state: tracks})
                    }}
                    >Listen Track</Button>
                    </Link>
                    </div> 
                </Card.Body>
        </Card>
            )
          })}
        </Row>      
      </Container>
      <Link to='/recommendation-by-choosing' state={selectedTracks}>
        <Button className='subm' variant="success" onClick={() => {
          nav('/recommendation-by-choosing', { state:selectedTracks});
        }}>Submit  
        </Button>
      </Link>
        <ToastContainer />
    </div>
  )
}

export default SearchAndChoose
