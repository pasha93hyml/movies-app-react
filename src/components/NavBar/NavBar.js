import { Component } from "react";

import MovieService from "../../service/MovieService";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    genres: [],
    isDrop: false,
    query: '',
    searchResults: []
  };

  movieService = new MovieService();

  componentDidMount() {
    this.movieService.getGenres().then((data) => {
      const genresArr = data.map((item) => item.name);
      this.setState({ genres: [...this.state.genres, ...genresArr] });
    });
  }

  toggleDropMenu = () => {
    this.setState({ isDrop: !this.state.isDrop });
  };

  renderItems = (items) => {
    return items.map((item, i) => (
      <li className="dropdown-item" key={i}>
        <a href="#">{item}</a>
      </li>
    ));
  };

  onSearch = (event) => {
    event.preventDefault()
    this.setState({query: event.target.value})
  }

  handleSearchResults = () => {
    this.movieService.getSearchResults(this.state.query).then(data => {
      this.setState({searchResults: [...data]})
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchResults !== this.state.searchResults) {

      this.props.handleSearch(this.state.searchResults)
    }
  }

  render() {
    const markup = this.state.genres.length && this.renderItems(this.state.genres);

    return (
      <div className="nav-wrapper">
        <div className="container">
          <div className="dropdown">
            <button className="dropdown-btn" onClick={this.toggleDropMenu}>
              Жанры
            </button>
            {this.state.isDrop && (
              <ul className="dropdown-content">{markup}</ul>
            )}
          </div>

          <div className="search-container">
    <form onSubmit={(e) => e.preventDefault()}>
      <input onChange={this.onSearch} type="text" placeholder="Search.." name="search" value={this.state.query}/>
      <button onClick={this.handleSearchResults} type="submit"><i className="fa fa-search"></i></button>
    </form>
  </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
