import { useEffect, useState, Suspense, useRef } from "react";
import {
  useParams,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchMovieDetails } from "../apiTmdb";
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";
import Loader from "../components/Loader/Loader";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const locationRef = useRef(location.state);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const backLink = locationRef.current?.from ?? "/movies";

  const handleGoBack = () => {
    navigate(backLink);
  };

  if (!movie) return <Loader />;

  return (
    <div className={styles.container}>
      <button className={styles.goBackBtn} onClick={handleGoBack}>
        Go back
      </button>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.movieImg}
        />
        <div className={styles.movieInfo}>
          <h2 className={styles.movieTitle}>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <p className={styles.movieScore}>
            User score: {Math.round(movie.vote_average * 10)}%
          </p>
          <h3 className={styles.movieOverview}>Overview</h3>
          <p className={styles.movieOverviewText}>{movie.overview}</p>
          <h4 className={styles.movieGenres}>Genres</h4>
          <p className={styles.movieGenresText}>
            {movie.genres.map((genre) => genre.name).join(", ") || "N/A"}
          </p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional information:</h3>
        <ul className={styles.additionalLinks}>
          <li>
            <Link to="cast" state={{ from: backLink }} className={styles.link}>
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              state={{ from: backLink }}
              className={styles.link}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast movieId={movieId} />} />
          <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
