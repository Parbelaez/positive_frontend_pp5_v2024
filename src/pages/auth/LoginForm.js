import React, { useState } from 'react';
import { Col, Container, Row, Stack, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    // We need to destruct the signUpData object to get easier the values of the form fields
    const { username, password } = loginData;

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            // Remember to spread the signUpData object to keep the other values
            ...loginData,
            // Dynamically set the name of the field and the value
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/login/', loginData);
            navigate('/');
        } catch (error) {
            console.error('An error occurred:', error.response);
            setError(error.response?.data);
        }
    };


    return (
        <Container className="position-absolute top-50 start-50 translate-middle">
            <Stack gap={4}>
            <Row className="justify-content-md-center">
                <Col xs lg="4">
                    <h1 className='fst-italic'>LET'S BE POSITIVE!</h1>
                    <p>
                        Login to your account and share your experiences.
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                    <Col xs lg="4">
                        <Form onSubmit={handleSubmit}>
                            {error.non_field_errors?.map((message, index) => (
                                <Alert variant="warning" key={index}>
                                    {message}
                                </Alert>
                            ))}
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="username"
                                    name='username'
                                    value={username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {error.username?.map((message, index) => (
                                <Alert variant="warning" key={index}>
                                    {message}
                                </Alert>
                            ))}
                            <Form.Group className="mb-3" controlId="password1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {error.password1?.map((message, index) => (
                                <Alert variant="warning" key={index}>
                                    {message}
                                </Alert>
                            ))}
                            <p>
                                Don't have an account? <Link to="/signup">Sign Up!</Link>                                
                            </p>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Stack>
        </Container>
    );
}

export default LoginForm;