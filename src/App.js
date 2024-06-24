import "./App.css";

import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleClickMovie(movie) {
    setSelectedMovie((sel) => (sel?.imdbID === movie.imdbID ? null : movie));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar />
        <Found />
      </NavBar>

      <Main>
        <Box>
          <MovieList
            tempMovieData={tempMovieData}
            onClickMovie={handleClickMovie}
          />
        </Box>
        <Box>
          {selectedMovie === null ? (
            <WatchedList tempWatchedData={tempWatchedData} />
          ) : (
            <MovieDetail selectedMovie={selectedMovie} />
          )}
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <div className="nav-bar">{children}</div>;
}

function Logo() {
  return (
    <div className="logo">
      <span>🍿</span>
      <span>usePopcorn</span>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="search-bar">
      <input></input>
    </div>
  );
}

function Found() {
  return <div>Found X results</div>;
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function Box({ children }) {
  return <div>{children}</div>;
}

function MovieList({ tempMovieData, onClickMovie }) {
  return (
    <div className="movie-list">
      {tempMovieData.map((movie) => (
        <MovieItem movie={movie} onClickMovie={onClickMovie} />
      ))}
    </div>
  );
}

function MovieItem({ movie, onClickMovie }) {
  return (
    <div className="movie-item" onClick={() => onClickMovie(movie)}>
      <div>{movie.Title}</div>
      <div>{movie.Year}</div>
    </div>
  );
}

function WatchedList({ tempWatchedData }) {
  return (
    <div className="movie-list">
      {tempWatchedData.map((watched) => (
        <WatchedItem watched={watched} />
      ))}
    </div>
  );
}

function WatchedItem({ watched }) {
  return (
    <div className="movie-item">
      <div>{watched.Title}</div>
      <div>{watched.Year}</div>
    </div>
  );
}

function MovieDetail({ selectedMovie }) {
  return (
    <div>
      <div>{selectedMovie.Title}</div>
      {/* <Rating /> */}
      <div>{selectedMovie.Year}</div>
    </div>
  );
}

export default App;
