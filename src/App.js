import { Component } from 'react';

import MovieService from './service/MovieService';

import BounceLoader from 'react-spinners/BounceLoader'
import ErrorMessage from './components/errorMessage/ErrorMessage';

import NavBar from './components/NavBar/NavBar';
import MovieCarousel from './components/movieCarousel/MovieCarousel'
import MoviesList from './components/moviesList/MoviesList'
import MoviePage from './components/moviePage/MoviePage';
import './App.css';

class App extends Component {
  state = {
    loading: true,
    error: false,
    baseUrl: '',
    moviesData: [],
    movieData: null,
    currentPage: 0,
    showMainContent: false,
    showSearchReasults: false,
    showGenreList: false,
    showMoviePage: false,
    query: '',
    genreId: null,
    movieID: null,
  }

  movieService = new MovieService();

   componentDidMount() {
     this.movieService.getConfiguration().then(({base_url, poster_sizes}) => {
      this.setState({
        baseUrl: base_url.slice(0, -1) + "/" + poster_sizes[5]
      })
    }).catch(this.onError)
    this.fetchMoviesData('getPopularMovies', 'showMainContent')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('update');
    if(this.state.query !== prevState.query) {
      this.setState({showSearchReasults: false})
    }
    if(!!this.state.query && this.state.query !== prevState.query) {
      this.fetchMoviesData('getSearchResults', 'showSearchReasults', 1, this.state.query)
    }

    if(this.state.genreId !== prevState.genreId) {
      this.setState({showGenreList: false})
    }

    if(this.state.genreId && this.state.genreId !== prevState.genreId) {
      this.fetchMoviesData('getMoviesByGenre','showGenreList', 1, this.state.genreId)
      console.log(this.state.moviesData);
    }

    if(this.state.movieID && this.state.movieID !== prevState.movieID) {
      this.fetchMovieData()
    }
  }

  handleQuery = (value) => {
    this.setState({query: value})
  }

  handleGenreId = (id) => {
    this.setState({genreId: id})
  }

  handleMovieId = (id) => {
    this.setState({movieID: id})
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

  onLoadMore = (page) => {
    const {showMainContent, showSearchReasults, showGenreList, query} = this.state;
    const content = (showMainContent && 'showMainContent') || 
                    (showSearchReasults && 'showSearchReasults') || 
                    (showGenreList && 'showGenreList')
    const func = (showMainContent && 'getPopularMovies') ||
                  (showSearchReasults && 'getSearchResults') ||
                  (showGenreList && 'getMoviesByGenre');
    this.fetchMoviesData(func, content, page, query);
  }

  onError = (error) => {
    this.setState({
      error: true,
      loading: false,
      showMainContent: false,
      showSearchReasults: false,
      showGenreList: false,
    })
  }

  fetchMoviesData =  (func, content = 'showMainContent', page = 1,  value = null) => {
     this.movieService[func](page, value).then(data => {
      const responseData = data.map(this._modifyData)
      this.setState({
        showMainContent: content === 'showMainContent',
        showSearchReasults: content === 'showSearchReasults',
        showGenreList: content === 'showGenreList',
        showMoviePage: false,
        currentPage: page,
        moviesData: (!this.state[content]) ? [...responseData] : [...this.state.moviesData, ...responseData],
        loading: false,
        movieID: null,
        movieData: null,
      })
    }).catch(this.onError)
  }

  fetchMovieData = () => {
    this.movieService.getDetails(this.state.movieID)
    .then(res => {
      this.setState(() => ({
      movieData: res, 
      showMainContent: false,
      showSearchReasults: false,
      showGenreList: false,
      showMoviePage: true,
    }))}).catch(this.onError)
  }

  render() {
    const {loading, error, moviesData, showSearchReasults, showGenreList, showMainContent, showMoviePage, baseUrl, movieData, movieID} = this.state;
    const spinner = loading ? <BounceLoader color={'#fff'} loading={this.state.loading} size={300}/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const showContent = showSearchReasults || showMainContent || showGenreList;
    return (
        <div className="App">
          <header>
            <NavBar fetchMoviesData={this.fetchMoviesData} 
            handleHomeBtn={this.fetchMoviesData}
            handleQuery={this.handleQuery}
            showMainContent={showMainContent}
            handleGenreId={this.handleGenreId}/>
          </header>
          <main>
            {errorMessage}
            {spinner}
            {showMainContent &&  <MovieCarousel fetchMoviesData={this.fetchMoviesData}  handleMovieId={this.handleMovieId}/>}
            {showContent && <MoviesList data={moviesData} onLoadMore={this.onLoadMore} handleMovieId={this.handleMovieId}/>}
            {showMoviePage && <MoviePage baseUrl={baseUrl} data={movieData}/>}
          </main>
        </div>
      
    );
  }
}

export default App;

