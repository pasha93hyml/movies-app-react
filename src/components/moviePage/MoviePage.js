import { Component } from 'react';

import './moviePage.css'

class MoviePage extends Component {

    render() {
        return (
            <div className="movie">
                <div className="item">Movie title</div>
                <div className="item">Movie poster</div>
                <div className="item">Movie player</div>
                <div className="item">Movie details</div>
                <div className="item">Movie description</div>
                <div className="item">6</div>
            </div>
        )
    }
    
}

export default MoviePage;