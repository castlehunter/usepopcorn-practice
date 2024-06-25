import "./App.css";
import StarRating from "./StarRating";

import { useEffect, useState } from "react";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fetchData, setFetchData] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [watchedMovies, setWatchedMovies] = useState([]);

  function handleClickMovie(movie) {
    setSelectedMovie((sel) => (sel?.imdbID === movie.imdbID ? null : movie));
  }

  function handleAddToList(item) {
    setWatchedMovies((previousWatchedMovies) => [
      ...previousWatchedMovies,
      item,
    ]);
  }

  function handleCloseDetail() {
    setSelectedMovie(null);
  }

  useEffect(() => {
    console.log("Watched Movies: ", watchedMovies);
  }, [watchedMovies]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=53f29112&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setFetchData(data.Search);
      } catch (err) {
        setError(err.message);
      }
    }
    if (query.length < 3) {
      setFetchData([]);
      setError("");
      return;
    }
    fetchData();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} onChangeQuery={setQuery} />
        <Found />
      </NavBar>

      <Main>
        <Box>
          <MovieList data={fetchData} onClickMovie={handleClickMovie} />
        </Box>
        <Box>
          {selectedMovie === null ? (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedList watchedMovies={watchedMovies} />
            </>
          ) : (
            <MovieDetail
              selectedMovie={selectedMovie}
              watchedMovies={watchedMovies}
              onAddToList={handleAddToList}
              onCloseDetail={handleCloseDetail}
            />
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

function SearchBar({ query, onChangeQuery }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter movie name"
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
      />
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
  return <div className="box">{children}</div>;
}

function MovieList({ data, onClickMovie }) {
  return (
    <div className="movie-list">
      {data.map((movie) => (
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

function WatchedSummary({ watchedMovies }) {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>x</span>
        </p>
        <p>
          <span>🌟</span>
          <span>x</span>
        </p>
        <p>
          <span>⏳</span>
          <span>x min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watchedMovies }) {
  return (
    <div className="movie-list">
      {watchedMovies.map((watchedMovie) => (
        <WatchedItem watchedMovie={watchedMovie} />
      ))}
    </div>
  );
}

function WatchedItem({ watchedMovie }) {
  return (
    <div className="movie-item">
      <div>{watchedMovie.Title}</div>
      <div>{watchedMovie.Year}</div>
    </div>
  );
}

function MovieDetail({ selectedMovie, onAddToList, onCloseDetail }) {
  const [selectedMovieWithDetail, setSelectedMovieWithDetial] = useState({});

  function handleAdd() {
    onAddToList(selectedMovie);
  }

  useEffect(() => {
    async function fetchBasedOnI() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=53f29112&i=${selectedMovie.imdbID}`
      );
      const selectedMovieWithDetail = await res.json();
      setSelectedMovieWithDetial(selectedMovieWithDetail);
    }

    fetchBasedOnI();
  }, [selectedMovie]);

  return (
    <div className="detail">
      <header>
        <button className="btn-back" onClick={onCloseDetail}>
          &larr;
        </button>
        {/* <img src={selectedMovieWithDetail.Poster} alt={`Poster of movie`} /> */}
        <div className="details-overview">
          <h2>{selectedMovieWithDetail.Title}</h2>
          <p>
            Released: {selectedMovieWithDetail.Released} &bull; Runtime:{" "}
            {selectedMovieWithDetail.Runtime}
          </p>
          <p>Genre: {selectedMovieWithDetail.Genre}</p>
          <p>
            <span>🍿</span>
            {selectedMovieWithDetail.imdbRating} IMDB rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />

          <button className="btn-add" onClick={handleAdd}>
            + Add To List
          </button>

          <p>
            <em>{selectedMovieWithDetail.Plot}</em>
          </p>
          <p>Starring {selectedMovieWithDetail.Actors}</p>
          <p>Directed by {selectedMovieWithDetail.Director}</p>
        </div>
      </section>
    </div>
  );
}

export default App;
