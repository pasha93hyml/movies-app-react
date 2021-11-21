import { Component } from "react";

import "./MoviesList.css";
import BounceLoader from 'react-spinners/BounceLoader'
class MoviesList extends Component {
  state = {
    loading: true,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ loading: false, currentPage: this.state.currentPage + 1 });
  }

  componentWillUnmount() {
    this.setState({currentPage: 1})
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
    const { data, onLoadMore } = this.props;;
    const content = data.length && this.renderItems(data);
    return (
      <>
        <BounceLoader color={'#fff'} loading={this.state.loading} size={300}/>
        <div className="bg-light pt-3">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {data.length && content}
            <button
              className="btn btn-secondary d-block mx-auto mb-3"
              type="button"
              onClick={() => {
                onLoadMore(this.state.currentPage)
                this.setState({currentPage: this.state.currentPage + 1})
              }}
            >
              Load more
            </button>
          </div>
        </div>
        </div>
      </>
    );
  }
}

export default MoviesList;
