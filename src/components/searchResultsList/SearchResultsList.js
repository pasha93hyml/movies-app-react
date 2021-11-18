import { Component } from "react";
import MovieService from "../../service/MovieService";

import "./searchResultsList.css";

class MoviesList extends Component {
  state = {
    moviesDataArr: [],
  };

  movieService = new MovieService();

  componentDidUpdate(prevProps, prevState) {
      if(prevProps.data !== this.props.data) {
        this.handleSearchQuery()
      }
  }

  componentDidMount() {
    this.handleSearchQuery()
  }

  handleSearchQuery = () => {
    this.movieService.getConfiguration().then(({ base_url, poster_sizes }) => {
        const searchMovies = this.props.data.map((item) => ({
          id: item.id,
          overview: item.overview,
          release_date: item.release_date,
          title:
            item.title.length < 27 ? item.title : item.title.slice(0, 27) + "...",
          imgUrl:
            base_url.slice(0, -1) + "/" + poster_sizes[2] + item.poster_path,
        }));
  
        this.setState({
          moviesDataArr: [...searchMovies.splice(0, 12)],
        });
      });
  }

  renderItems = (items) => {
    return items.map((item, i) => {
      return (
        <div key={i} className="col">
          <div className="card">
            <div className="card-ref">
              <img
                src={item.imgUrl}
                className="card-img-top"
                alt={item.title}
                height="300"
              />
              <div className="card-body">
                <p className="card-title">{item.title}</p>
                <p className="card-text">{item.release_date}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    const markup =
      this.state.moviesDataArr.length &&
      this.renderItems(this.state.moviesDataArr);
    return (
      <>
        <div className="container btn-wrapper">
          <button type="button" className="btn btn-secondary btn-lg">
            Фильмы
          </button>
        </div>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-6 g-4">
            {this.state.moviesDataArr.length && markup}
          </div>
        </div>
      </>
    );
  }
}

export default MoviesList;
