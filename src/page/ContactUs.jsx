import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/contactsSlice';

const ContactUs = () => {
  const dispatch = useDispatch();

  // State to manage form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // State to handle form validation and success message
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill out all fields.');
      return;
    }

    // Dispatch addUser action with form data
    dispatch(addUser(formData))
      .then(() => {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
        });
      })
      .catch(() => setError('Failed to submit. Please try again.'));
  };

  useEffect(() => {
    // Hide success message after 10 seconds
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 10000);
      return () => clearTimeout(timer); // Clear timer on component unmount
    }
  }, [submitted]);

  return (
    <Container style={{ maxWidth: '600px', marginTop: '50px' }}>
      <h1>Contact Us</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {submitted && <Alert variant="success" className="mt-3">Form submitted successfully!</Alert>}

        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ContactUs;
