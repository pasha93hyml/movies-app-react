import { Component } from 'react';

import MovieService from './service/MovieService';

import NavBar from './components/NavBar/NavBar';
import MovieCarousel from './components/movieCarousel/MovieCarousel'
import MoviesList from './components/moviesList/MoviesList'
import MoviePage from './components/moviePage/MoviePage';
import './App.css';

class App extends Component {
  state = {
    baseUrl: '',
    moviesData: [],
    currentPage: 0,
    showMainContent: true,
    showSearchReasults: false,
    showGenreList: false,
    query: ''
  }

  movieService = new MovieService();

  async componentDidMount() {
    await this.movieService.getConfiguration().then(({base_url, poster_sizes}) => {
      console.log(poster_sizes);
      this.setState({
        baseUrl: base_url.slice(0, -1) + "/" + poster_sizes[5]
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

  fetchMoviesData = (func, content = 'showMainContent', page,  value = null) => {
    this.movieService[func](page, value).then(data => {
      console.log(data);
      const responseData = data.map(this._modifyData)
      this.setState({
        showMainContent: content === 'showMainContent',
        showSearchReasults: content === 'showSearchReasults',
        showGenreList: content === 'showGenreList',
        currentPage: page,
        moviesData: (!this.state[content]) ? [...responseData] : [...this.state.moviesData, ...responseData],
        query: value,
      })
    })
  }

  fetchMovieData = () => {

  }

  render() {
    this.movieService.getDetails(763164).then(data => console.log(data))
    const {moviesData, showSearchReasults, showGenreList, showMainContent} = this.state;
    return (
      <div className="App">
        <NavBar fetchMoviesData={this.fetchMoviesData} 
        handleHomeBtn={this.fetchMoviesData}
        showMainContent={showMainContent}/>
        {showMainContent &&  <MovieCarousel/>}
        {showMainContent && <MoviesList data={moviesData} onLoadMore={this.onLoadMore}/>}
        {showSearchReasults && <MoviesList data={moviesData} onLoadMore={this.onLoadMore}/>}
        {showGenreList && <MoviesList data={moviesData} onLoadMore={this.onLoadMore}/>}
      </div>
    );
  }
  
}

export default App;


// adult: false
// backdrop_path: "/4gKxQIW91hOTELjY5lzjMbLoGxB.jpg"
// belongs_to_collection: null
// budget: 0
// genres: (3) [
//   0: {id: 28, name: 'боевик'}
//   1: {id: 53, name: 'триллер'}
//   2: {id: 878, name: 'фантастика'}
// ]
// homepage: ""
// id: 763164
// imdb_id: "tt13265876"
// original_language: "en"
// original_title: "Apex"
// overview: "Пять охотников покупают элитную услугу — возможность выследить человека на необитаемом острове, но сами становятся добычей."
// popularity: 2624.563
// poster_path: "/chTkFGToW5bsyw3hgLAe4S5Gt3.jpg"
// production_companies: (3) [
//   0: {id: 68628, logo_path: null, name: '308 Enterprises', origin_country: 'CA'}
//   1: {id: 121204, logo_path: null, name: 'BondIt Media Capital', origin_country: 'US'}
//   2: {id: 130900, logo_path: null, name: 'Buffalo 8 Productions', origin_country: 'US'}
// ]
// production_countries: (2) [
//   0: {iso_3166_1: 'CA', name: 'Canada'}
//   1: {iso_3166_1: 'US', name: 'United States of America'}
// ]
// release_date: "2021-11-12"
// revenue: 0
// runtime: 108
// spoken_languages: (2) [
//   0: {english_name: 'English', iso_639_1: 'en', name: 'English'}
//   1: {english_name: 'Ukrainian', iso_639_1: 'uk', name: 'Український'}
// ]
// status: "Released"
// tagline: ""
// title: "Преступный квест"
// video: false
// vote_average: 5.6
// vote_count: 157