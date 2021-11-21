import { Component } from 'react';

import './moviePage.css'

class MoviePage extends Component {
    
    render() {
        const {baseUrl, data} = this.props;
        console.log(data);
        return (
            <div className="movie">
                <div className="title">
                    <div className="title_wrapper">
                        <h3>{data.title}</h3>
                        <p>{data.original_title}</p>
                    </div>
                </div>
                <div className="poster"><img src={baseUrl + data.poster_path} alt={data.title} />
                    <div className="rate">Популярность фильма: {data.popularity}</div>
                </div>
                <div className="player">Тут мог бы быть плеер :)</div>
                <div className="details">{data.overview.length ? data.overview : 'Нет описания данного фильма'}</div>
                <div className="description">
                    
                    <div className="sub_grid">
                        <div className="sub_title">Год</div> <div className="sub_descr">{data.release_date}</div>
                        <div className="sub_title">Страна</div> <div className="sub_descr">{data.production_countries.map((item, i) => {
                            if(i + 1 === data.production_countries.length) {
                                return item + '.'
                            }
                            return item + ', '
                            })}</div>
                        <div className="sub_title">Жанр</div> <div className="sub_descr">{data.genres.map((item, i) => {
                            if(i + 1 === data.genres.length) {
                                return item + '.'
                            }
                            return item + ', '
                            })}</div>
                        <div className="sub_title">Время</div> <div className="sub_descr">{data.runtime}</div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default MoviePage;