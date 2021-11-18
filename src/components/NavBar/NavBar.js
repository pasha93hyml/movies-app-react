import { Component } from "react";

import MovieService from "../../service/MovieService";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    genres: [],
    isDrop: false,
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

  render() {
    const markup =
      this.state.genres.length && this.renderItems(this.state.genres);

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
        </div>
      </div>
    );
  }
}

export default NavBar;
