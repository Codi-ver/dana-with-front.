import "./App.css";
import MovieCard from "./components/movieCard";
const movies = [
    {
        id: 1,
        title: "Inception",
        release_date: "2010-07-16",
        url: "https://example.com/inception.jpg"
    },
    {
        id: 2,
        title: "The Dark Knight",
        release_date: "2008-07-18",
        url: "https://example.com/dark-knight.jpg"
    }
];

function App() {

  return (
    <>
      {movies.map(movie => {
        <MovieCard key ={movie.id} movie ={movie}/>
      })}
    </>
  )
}


export default App;