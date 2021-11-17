import { Component } from 'react';

import NavBar from './components/NavBar/NavBar';
import MovieCarousel from './components/movieCarousel/MovieCarousel'
import './App.css';

class App extends Component {

    

render() {
    return (
      <div className="App">
        <NavBar/>
        <MovieCarousel/>
      </div>
    );
  }
}

export default App;
