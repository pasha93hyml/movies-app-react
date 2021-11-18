import { Component } from 'react';

import NavBar from './components/NavBar/NavBar';
import MovieCarousel from './components/movieCarousel/MovieCarousel'
import MoviesList from './components/moviesList/MoviesList'
import SearchResultsList from './components/searchResultsList/SearchResultsList'
import './App.css';

class App extends Component {
  state = {
    searchResults: [],
    showSearchReasults: false
  }

  handleSearch = (arr) => {
    this.setState({searchResults: [...arr], showSearchReasults: true})
  }

  render() {
    return (
      <div className="App">
        <NavBar handleSearch={this.handleSearch}/>
        <MovieCarousel/>
        {this.state.showSearchReasults ||  <MoviesList/>}
       {this.state.showSearchReasults && <SearchResultsList data={this.state.searchResults}/>}
      </div>
    );
  }
  
}

export default App;
