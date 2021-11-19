import { Component } from 'react';

import MovieService from './service/MovieService';

import NavBar from './components/NavBar/NavBar';
import MovieCarousel from './components/movieCarousel/MovieCarousel'
import MoviesList from './components/moviesList/MoviesList'
import './App.css';

class App extends Component {
  state = {
    baseUrl: '',
    moviesData: [],
    currentPage: 1,
    showMainContent: true,
    showSearchReasults: false,
    showGenreList: false,
    query: ''
  }

  movieService = new MovieService();

  async componentDidMount() {
    await this.movieService.getConfiguration().then(({base_url, poster_sizes}) => {
      this.setState({
        baseUrl: base_url.slice(0, -1) + "/" + poster_sizes[2]
      })
    })
    this.fetchMoviesData('getPopularMovies', 'showMainContent')
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

  onLoadMore = () => {
    const {showMainContent, showSearchReasults, showGenreList, currentPage, query} = this.state;
    const content = (showMainContent && 'showMainContent') || 
                    (showSearchReasults && 'showSearchReasults') || 
                    (showGenreList && 'showGenreList')
    const func = (showMainContent && 'getPopularMovies') ||
                  (showSearchReasults && 'getSearchResults') ||
                  (showGenreList && 'getMoviesByGenre');
    this.fetchMoviesData(func, content, currentPage, query);
  }


  fetchMoviesData = (func, content = 'showMainContent', page = this.state.currentPage,  value = null) => {
    this.movieService[func](page, value).then(data => {
      console.log(data);
      const responseData = data.map(this._modifyData)
      this.setState(() => ({
        currentPage: this.state[content] ? this.state.currentPage + 1 : 1,
        moviesData: !this.state[content] ? [...responseData] : [...this.state.moviesData, ...responseData],
        query: value,
        showMainContent: content === 'showMainContent',
        showSearchReasults: content === 'showSearchReasults',
        showGenreList: content === 'showGenreList',
      }))
    })
  }

  

  handleSearch = (items) => {
      const searchMovies = items.map(this._modifyData);
      this.setState({
        searchResults: [...searchMovies],
        showSearchReasults: true,
        showMainContent: false,
        showGenreList: false,
        currentPage: 1,
        genreMovies: [],
        popularMovies: [],
      });
  }

  render() {
    const {moviesData, showSearchReasults, showGenreList, showMainContent, currentPage} = this.state;
    return (
      <div className="App">
        <NavBar handleSearch={this.handleSearch} 
        handleGenre={this.handleGenre} 
        fetchMoviesData={this.fetchMoviesData} 
        handleHomeBtn={() => this.fetchMoviesData('getPopularMovies', 'showMainContent')}
        currentPage={currentPage}/>
        {showMainContent &&  <MovieCarousel/>}
        {showMainContent && <MoviesList data={moviesData} onLoadMore={this.onLoadMore}/>}
        {showSearchReasults && <MoviesList data={moviesData} onLoadMore={this.onLoadMore}/>}
        {showGenreList && <MoviesList data={moviesData} onLoadMore={this.onLoadMore}/>}
       {/* {showSearchReasults && <SearchResultsList data={searchResults}/>}
       {showGenreList && <GenreList data ={this.state.genreMovies}/>} */}
      </div>
    );
  }
  
}

export default App;
