import { Component } from "react";

import MovieService from "../../service/MovieService";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    genres: [],
    isDrop: false,
    query: "",
    searchResults: [],
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
        this.props.fetchMoviesData('getMoviesByGenre','showGenreList', this.props.currentPage ,  item.id)
        this.setState({isDrop: false})
        }}>
        <span className="dropdown-item">
          {item.name}
        </span>
      </li>
    ));
  };

  onSearch = (event) => {
    event.preventDefault();
    this.setState({ query: event.target.value });
  };

  handleSearchResults = () => {
    this.movieService.getSearchResults(this.state.query).then((data) => {
      this.setState({ searchResults: [...data], query: '' });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchResults !== this.state.searchResults) {
      this.props.handleSearch(this.state.searchResults);
    }
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
                onClick={() => this.props.handleHomeBtn()}
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
                this.props.fetchMoviesData('getSearchResults', 'showSearchReasults', this.props.currentPage,  this.state.query)
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
