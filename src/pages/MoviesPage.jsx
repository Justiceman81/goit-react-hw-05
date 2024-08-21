import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../apiTmdb";
import MovieList from "../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query.trim() === "") {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const movies = await searchMovies(query);
        setMovies(movies);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.search.value.trim();

    if (newQuery === "") {
      return;
    }

    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
