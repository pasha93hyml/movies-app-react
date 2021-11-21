import { Component } from "react";

import MovieService from "../../service/MovieService";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    genres: [],
    isDrop: false,
    query: "",
    prevQuery: '',
  };

  movieService = new MovieService();

  componentDidMount() {
    this.movieService.getGenres().then((data) => {
      this.setState({ genres: [...this.state.genres, ...data] });
    });
  }

  toggleDropMenu = () => {
    this.setState({ isDrop: !this.state.isDrop });
  };

  renderItems = (items) => {
    return items.map((item, i) => (
      <li key={i} onClick={() => {
        this.props.handleGenreId(item.id)
        this.setState({isDrop: false})
        }}>
        <span className="dropdown-item">
          {item.name}
        </span>
      </li>
    ));
  };

  onSearch = (event) => {
    this.setState({ query: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    const markup = this.state.genres.length && this.renderItems(this.state.genres);
    const style = {
      'display': 'grid',
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridGap: '2vw',
    }
    return (
      <div className="nav-wrapper">
        <div className="container">
        <button
                className="btn btn-secondary mr-3"
                type="button"
                onClick={() => {
                  if(!this.props.showMainContent) {
                    this.props.handleHomeBtn('getPopularMovies', 'showMainContent', 1)
                    this.setState(() => ({
                      query: '',
                      prevQuery: ''
                    }))
                  }
                }}
              >
                Home page
              </button>
          <div className="dropdown">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.toggleDropMenu}
              >
                Жанры
              </button>
              {this.state.isDrop && 
                <ul className="dropdown-menu" style={style}>
                  {markup}
                </ul>
              }
          </div>

          <div className="search-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                onChange={this.onSearch}
                type="text"
                placeholder="Search.."
                name="search"
                value={this.state.query}
              />
              <button onClick={() => {
                if(this.state.query !== this.state.prevQuery) {
                  this.props.handleQuery(this.state.query)
                  this.setState(() => ({
                    prevQuery: this.state.query
                  }))
                }
                  
                }} type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;


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