import { Component } from 'react';

import MovieService from './service/MovieService';

import NavBar from './components/NavBar/NavBar';
import MovieCarousel from './components/movieCarousel/MovieCarousel'
import MoviesList from './components/moviesList/MoviesList'
import SearchResultsList from './components/searchResultsList/SearchResultsList'
import GenreList from './components/genreList/GenreList';
import './App.css';

class App extends Component {
  state = {
    baseUrl: '',
    popularMovies: [],
    searchResults: [],
    genreMovies: [],
    currentPage: 1,
    showMainContent: true,
    showSearchReasults: false,
    showGenreList: false
  }

  movieService = new MovieService();

  async componentDidMount() {
    await this.movieService.getConfiguration().then(({base_url, poster_sizes}) => {
      this.setState({
        baseUrl: base_url.slice(0, -1) + "/" + poster_sizes[2]
      })
    })
    await this.fetchPopularMoviesData()
  }

  _modifyData = (item) => {
    const {baseUrl} = this.state;
    return {
      id: item.id,
          overview: item.overview,
          release_date: item.release_date,
          title: item.title.length < 27 ? item.title : item.title.slice(0, 27) + '...',
          imgUrl: item.poster_path ? baseUrl + item.poster_path : 'https://cdn.browshot.com/static/images/not-found.png',
    }
  }

  fetchPopularMoviesData = () => {
      this.movieService.getPopularMovies(this.state.currentPage).then((data) => {
        const popularMoviesArr = data.map(this._modifyData);
        this.setState({
          popularMovies: [...this.state.popularMovies, ...popularMoviesArr],
          currentPage: this.state.currentPage + 1
        });
      });
  } 

  onLoadMore = () => {
    this.fetchPopularMoviesData();
  }

  handleGenre = (id) => {
      this.movieService.getMoviesByGenre(id).then(({results}) => {
        const genreMoviesArr = results.map(this._modifyData);
        this.setState({
          genreMovies: [...genreMoviesArr],
          showGenreList: true,
          showSearchReasults: false,
          showMainContent: false
        });
    });
  }

  handleSearch = (items) => {
      const searchMovies = items.map(this._modifyData);
      this.setState({
        searchResults: [...searchMovies],
        showSearchReasults: true,
        showMainContent: false,
        showGenreList: false
      });
  }

  render() {
    const {popularMovies, searchResults, showSearchReasults, showGenreList, showMainContent} = this.state;
    return (
      <div className="App">
        <NavBar handleSearch={this.handleSearch} handleGenre={this.handleGenre}/>
        {showMainContent &&  <MovieCarousel/>}
        {showMainContent && <MoviesList data={popularMovies} onLoadMore={this.onLoadMore}/>}
       {showSearchReasults && <SearchResultsList data={searchResults}/>}
       {showGenreList && <GenreList data ={this.state.genreMovies}/>}
      </div>
    );
  }
  
}

export default App;
