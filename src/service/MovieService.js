class MovieService  {
    _apiKey = 'api_key=e352cfad536dcafc2d9540798bc763ce';

    
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getConfiguration = async () => {
        const res = await this.getResource(`https://api.themoviedb.org/3/configuration?${this._apiKey}`)
        return res.images
    }

    getTopRatedMovies = async () => {
        const res = await this.getResource(`https://api.themoviedb.org/3/movie/top_rated?${this._apiKey}&language=en-US&page=1`)
        return res.results.map(this.modifiedTrend)
    }


    modifiedTrend = (item) => {
        return {
            id: item.id,
            title: item.title,
            overview: item.overview,
            poster_path: item.poster_path
        }
    }
    
}
export default MovieService;
// "request_token": "38093ceeb15e8e9f1254b1c3d6325084c2a3c21e"


// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzUyY2ZhZDUzNmRjYWZjMmQ5NTQwNzk4YmM3NjNjZSIsInN1YiI6IjYxNTYwMWFmZDIxNDdjMDA2MzMwN2NjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OxWmaxs_4xTBKW6LSbKGyObrGpVspdImhG2tUGagaeA

// session fac3f03c2da337d9afc1ddbd011f8d9bfd4f2a1b