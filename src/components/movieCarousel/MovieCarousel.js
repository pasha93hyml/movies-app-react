import React, { Component } from "react";
import MovieService from "../../service/MovieService";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./movieCarousel.css";

class movieCarousel extends Component {
  state = {
    imgsArr: [],
  };

  movieService = new MovieService();

  componentDidMount() {
    this.movieService.getConfiguration().then(({ base_url, poster_sizes }) => {
      this.movieService.getTopRatedMovies().then((data) => {
        const imgsArr = data.map(
          (item) =>
            base_url.slice(0, -1) + "/" + poster_sizes[2] + item.poster_path
        );
        this.setState(() => ({ imgsArr }));
      });
    });
  }

  renderItems = (items) => {
    const markup = items.map((item, i) => (
      <div key={i} className="item">
        <img key={i} src={item} alt="" height={300} />
      </div>
    ));
    return markup;
  };

  render() {
    const { imgsArr } = this.state;
    const items = this.renderItems(this.state.imgsArr);
    const options = {
      items: 5,
      margin: 20,
      lazyLoad: true,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
    };

    return (
      <div className="overfvow pt-2 bg-dark">
        <div className="container">
          {imgsArr.length && (
            <OwlCarousel className="owl-theme" {...options}>
              {items}
            </OwlCarousel>
          )}
        </div>
      </div>
    );
  }
}

export default movieCarousel;
