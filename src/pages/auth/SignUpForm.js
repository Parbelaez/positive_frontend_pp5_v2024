import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';


const SignUpForm = () => {
    useRedirect('loggedIn');
    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });
    // We need to destruct the signUpData object to get easier the values of the form fields
    const { username, email, password1, password2 } = signUpData;

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignUpData({
            // Remember to spread the signUpData object to keep the other values
            ...signUpData,
            // Dynamically set the name of the field and the value
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            // Redirect to the login page
            console.log('User created');
            navigate('/login');
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
                        Sign up for an account and share your experiences.
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
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name='email'
                                        value={email}
                                        onChange={handleChange}
                                    />
                            </Form.Group>
                            {error.email?.map((message, index) => (
                                <Alert variant="warning" key={index}>
                                    {message}
                                </Alert>
                            ))}
                            <Form.Group className="mb-3" controlId="password1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name='password1'
                                    value={password1}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {error.password1?.map((message, index) => (
                                <Alert variant="warning" key={index}>
                                    {message}
                                </Alert>
                            ))}
                            <Form.Group className="mb-3" controlId="password2">
                                    <Form.Control
                                        type="password"
                                        placeholder="Please, re-enter the password"
                                        name='password2'
                                        value={password2}
                                        onChange={handleChange}
                                    />
                            </Form.Group>
                            {error.password2?.map((message, index) => (
                                <Alert variant="warning" key={index}>
                                    {message}
                                </Alert>
                            ))}
                            <p>
                                Already have an account? <Link to="/login">Login</Link>                                
                            </p>
                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Stack>
        </Container>
    );
}

export default SignUpForm;