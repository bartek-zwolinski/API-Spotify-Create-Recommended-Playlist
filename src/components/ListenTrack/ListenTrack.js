
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom'
import { Container,Button, Row, Card} from 'react-bootstrap'
import  useAuth  from '../useAuth/useAuth'
import { useState,  useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ListenTrack.css'

const ListenTrack = () => {
    
  const { id } = useParams();
  const {validation} = useAuth();
  const [track, setTrack] = useState();
  const location = useLocation();
  const data = location.state
  const nav = useNavigate();

  useEffect(() => {
    axios(`https://api.spotify.com/v1/tracks/${id}?market=ES`, validation)
    .then(response => response.data)
    .then(data => setTrack(data))
  }, [validation, id]);

    return (
    <div> 
        <Link to="/search-and-rate-tracks" state = {data}>
         <Button variant="success" onClick={()=>{
          nav('/search-and-rate-tracks', { state: data})
         }}>Back Home</Button>
        </Link>              
        <Container>
        <Row className="mx-2 ">
        <Card key={track?.id}>
        <Card.Header> {track?.name}</Card.Header>
            <Card.Img src={track?.album.images[0].url}/>
                <Card.Body>
                <Card.Title>Track info:</Card.Title>
                    <Card.Subtitle>Name: <br></br><span>{track?.name}</span></Card.Subtitle>
                    <Card.Subtitle>Spotify popularity (0-100): <br></br><span>{track?.popularity}</span></Card.Subtitle>
                    <Card.Subtitle>Number of track in album: <br></br><span>{track?.track_number}</span></Card.Subtitle>
                    <Card.Subtitle>Number of track type: <br></br><span>{track?.type}</span></Card.Subtitle>
                    <Card.Subtitle>Track on spotify: <br></br><Button className='spotify'><a href={track?.external_urls.spotify}>Spotify Track</a></Button></Card.Subtitle>
                    <Card.Title>Album info:</Card.Title>   
                    <Card.Subtitle>Album Name: <br></br><span>{track?.album.name}</span></Card.Subtitle>   
                    <Card.Subtitle>Album Type: <br></br><span>{track?.album.album_type}</span></Card.Subtitle>
                    <Card.Subtitle>Release date: <br></br><span>{track?.album.release_date}</span></Card.Subtitle>
                    <Card.Subtitle>Total tracks: <br></br><span>{track?.album.total_tracks}</span></Card.Subtitle>
                    
                    <Card.Subtitle>Track on spotify: <br></br><Button className='spotify'><a href={track?.album.external_urls.spotify}>Spotify Album</a></Button></Card.Subtitle>
                    <Card.Title>Artist info:</Card.Title>
                    <Card.Subtitle>Artists on track: </Card.Subtitle>
                    {track?.artists.map((artist) => {
                     return <Card.Subtitle className='art' key={artist?.id}><span>• {artist.name}</span> <br></br><Button className='spotify'><a href={track?.album.external_urls.spotify}>Spotify artist</a></Button></Card.Subtitle>
                       
                    })}  
                    <Card.Subtitle className='info'>Info based on Spotify Api</Card.Subtitle> 
                </Card.Body>
              <Button className='listen-track'><a href={track?.preview_url}>Check 30s preview of track</a></Button>
        </Card>  
        </Row>
      </Container>
    </div>
  )
}

export default ListenTrack
