import { Component } from "react";
import MovieService from "../../service/MovieService";

class MoviesList extends Component {
  state = {
    moviesDataArr: [],
  };

  movieService = new MovieService();

  componentDidMount() {
    this.movieService.getConfiguration().then(({ base_url, poster_sizes }) => {
      this.movieService.getPopularMovies().then((data) => {
        const popularMoviesArr = data.map((item) => ({
          id: item.id,
          overview: item.overview,
          release_date: item.release_date,
          title: item.title,
          imgUrl:
            base_url.slice(0, -1) + "/" + poster_sizes[2] + item.poster_path,
        }));

        this.setState({
          moviesDataArr: [...this.state.moviesDataArr, ...popularMoviesArr],
        });
      });
    });
  }

  renderItems = (items) => {
    return items.map((item, i) => {
      return (
        <div className="col">
            <a href="#">
          <div className="card">
            <img src={item.imgUrl} className="card-img-top" alt={item.title} />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">
                {item.release_date}
              </p>
            </div>
          </div>
          </a>
        </div>
      );
    });
  };
  render() {
      const markup = this.renderItems(this.state.moviesDataArr)
    return (
      <div className="container">
        <div className="row row-cols-1 row-cols-md-6 g-4">
            {this.state.moviesDataArr.length && markup}
        </div>
      </div>
    );
  }
}

export default MoviesList;
