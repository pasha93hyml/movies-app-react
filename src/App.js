import NavBar from './components/NavBar/NavBar';
import MovieCarousel from './components/movieCarousel/MovieCarousel'
import MoviesList from './components/moviesList/MoviesList'
import './App.css';

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <MovieCarousel/>
      <MoviesList/>
    </div>
  );
}

export default App;
