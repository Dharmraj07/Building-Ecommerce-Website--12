import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { deleteMovie } from "../features/moviesSlice";
import { useDispatch } from "react-redux";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteMovie(movie.id));
  };

  return (
    <Col key={movie.id} md={4} className="mb-4">
      <Card>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Text>{movie.openingText.slice(0, 150)}...</Card.Text>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MovieCard;
