import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { CLIENT_ID, CLIENT_SECRET} from '../../passes'

function Auth() {

  const [validation, setValidation] = useState('');
  const [token ,setToken] = useState('');

  useEffect(() => {
    let authParameters = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&scope=streaming'
    }
      fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => data.access_token)
      .then(track =>  {
        let tracks = {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + track 
        }
      }
      setToken(track);
      setValidation(tracks);
    })

  },[])

  return {validation, token}
}

export default Auth;