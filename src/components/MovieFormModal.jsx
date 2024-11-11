import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";

const MovieFormModal = ({ showModal, handleCloseModal, handleAddMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    releaseDate: "",
    openingText: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!showModal) {
      setNewMovie({ title: "", releaseDate: "", openingText: "" });
      setFormError("");
    }
  }, [showModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const validateForm = () => {
    if (!newMovie.title || !newMovie.releaseDate || !newMovie.openingText) {
      setFormError("All fields are required.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const movieWithId = {
        ...newMovie,
        id: crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substr(2, 9),
      };
      handleAddMovie(movieWithId);
      handleCloseModal();
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formError && <Alert variant="danger">{formError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="movieTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter movie title"
              name="title"
              value={newMovie.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="movieReleaseDate" className="mb-3">
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              type="date"
              name="releaseDate"
              value={newMovie.releaseDate}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="movieOpeningText" className="mb-3">
            <Form.Label>Opening Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter opening text"
              name="openingText"
              value={newMovie.openingText}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Add Movie
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MovieFormModal;
