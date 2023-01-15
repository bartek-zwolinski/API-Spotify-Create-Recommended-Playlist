import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchAndRate from './components/SearchAndRate/SearchAndRate';
import ListenTrack from './components/ListenTrack/ListenTrack';
import ListenTrackV2 from './components/ListenTrackV2/ListenTrackV2';
import RecommendationByValue from './components/RecommendationByValue/RecommendationByValue';
import SearchAndChoose from './components/SearchAndChoose/SearchAndChoose';
import MainPage from './components/MainPage/MainPage';
import RecommendationByChoosing from './components/RecommendationByChoosing/RecommendationByChoosing';
import './App.css'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route path="/search-and-rate-tracks" element={<SearchAndRate></SearchAndRate>}></Route>
          <Route path="/search-and-choose-tracks" element={<SearchAndChoose></SearchAndChoose>}></Route>
          <Route path='/v1/:id' element={<ListenTrack></ListenTrack>}></Route>
          <Route path='/v2/:id' element={<ListenTrackV2></ListenTrackV2>}></Route>
          <Route path='/recommendation-by-value' element={<RecommendationByValue/>}></Route> 
          <Route path='/recommendation-by-choosing' element={<RecommendationByChoosing/>}></Route>        
        </Routes>
      </Router>
    </div>
  );
}


export default App;
