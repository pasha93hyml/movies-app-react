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