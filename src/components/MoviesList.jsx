import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, fetchMovies } from "../features/moviesSlice";
import { Button, Spinner, Alert, Row } from "react-bootstrap";
import MovieCard from "./MovieCard";
import MovieFormModal from "./MovieFormModal";

const MoviesList = () => {
  const { movies, status, error } = useSelector((state) => state.movies);
  console.log(movies);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Memoize the list of movies to avoid recalculating it on every render
  const memoizedMovies = useMemo(() => {
    return movies.map((movie) => (
      <MovieCard key={movie.id} movieId={movie.id} movie={movie} />
    ));
  }, [movies]);

  // useCallback to memoize the function that dispatches fetchMovies
  const handleFetchMovies = useCallback(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleShowModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const handleAddMovie = useCallback(
    (movie) => {
      dispatch(addMovie(movie));
      handleCloseModal();
    },
    [dispatch, handleCloseModal]
  );

  return (
    <div>
      <Button
        onClick={handleFetchMovies}
        className="mb-4"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Loading..." : "Fetch Movies"}
      </Button>
      <Button onClick={handleShowModal} variant="success" className="mb-4 ms-2">
        Add New Movie
      </Button>

      {status === "loading" && <Spinner animation="border" variant="primary" />}
      {status === "failed" && (
        <Alert variant="danger">
          Error: {error}
          <Button onClick={handleFetchMovies} variant="link" size="sm">
            Retry
          </Button>
        </Alert>
      )}

      <MovieFormModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAddMovie={handleAddMovie}
      />

      {/* Memoized movie list */}
      <Row>{memoizedMovies}</Row>
    </div>
  );
};

export default MoviesList;
