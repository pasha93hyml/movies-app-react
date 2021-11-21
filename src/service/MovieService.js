class MovieService  {
    _apiBase = 'https://api.themoviedb.org/3/'
    _apiKey = 'api_key=e352cfad536dcafc2d9540798bc763ce';

    
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getConfiguration = async () => {
        const res = await this.getResource(`${this._apiBase}configuration?${this._apiKey}`)
        return res.images
    }

    getTopRatedMovies = async () => {
        const res = await this.getResource(`${this._apiBase}movie/top_rated?${this._apiKey}&language=ru-RU&page=10`)
        return res.results.map(this.modifiedItem)
    }
    
    getPopularMovies = async (page) => {
        const requesturl = `${this._apiBase}movie/popular?${this._apiKey}&language=ru-RU&page=${page}`
        const res = await this.getResource(requesturl)

        return res.results.map(this.modifiedItem)
    }

    getGenres = async () => {
        const res = await this.getResource(`${this._apiBase}genre/movie/list?${this._apiKey}&language=ru-RU`)

        return res.genres;
    }


    getMoviesByGenre = async (page = 1, id) => {
        const requestUrl = `${this._apiBase}discover/movie?${this._apiKey}&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=${id}`
        console.log(page);
        const res = await this.getResource(requestUrl)
        return res.results;
    }

    getSearchResults = async (page = 1, query) => {
        console.log(page);
        const res = await this.getResource(`${this._apiBase}search/movie?${this._apiKey}&language=ru-RU&page=${page}&query=${query}`)
        return res.results.map(this.modifiedItem);
    }

    getDetails = async (id) => {
        const responseUrl = `${this._apiBase}movie/${id}?${this._apiKey}&language=ru-RU`
        const res = await this.getResource(responseUrl)
        await console.log(res);
        return this.modifyMovieItem(res);
    }

    modifiedItem = (item) => {
        return {
            id: item.id,
            title: item.title,
            overview: item.overview,
            poster_path: item.poster_path,
            release_date: item.release_date.slice(0, 4)
        }
    }

    modifyMovieItem = (item) => ({
        poster_path: item.poster_path,
        genres: [...item.genres.map(genre => genre.name)],
        overview: item.overview,
        popularity: item.popularity,
        production_companies: [...item.production_companies.map(companie => companie.name)],
        production_countries: [...item.production_countries.map(country => country.name)],
        release_date: item.release_date.slice(0, 4),
        runtime: item.runtime + ' мин',
        title: item.title,
        budget: item.budget,
        original_title: item.original_title
    })
    
}
export default MovieService;
// "request_token": "38093ceeb15e8e9f1254b1c3d6325084c2a3c21e"


// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzUyY2ZhZDUzNmRjYWZjMmQ5NTQwNzk4YmM3NjNjZSIsInN1YiI6IjYxNTYwMWFmZDIxNDdjMDA2MzMwN2NjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OxWmaxs_4xTBKW6LSbKGyObrGpVspdImhG2tUGagaeA

// session fac3f03c2da337d9afc1ddbd011f8d9bfd4f2a1b