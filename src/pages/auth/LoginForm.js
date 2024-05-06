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
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { setTokenTimestamp } from "../../utils/utils";


const LoginForm = () => {
    const setCurrentUser = useSetCurrentUser();

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    // We need to destruct the signUpData object to get easier the values of the form fields
    const { username, password } = loginData;

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Axios POST has a POJO response, in which the content of the body is called "data"
            // We will dessctructure the response to get the "data" object
            // and then we will extract the user information from it 
            const { data } = await axios.post('/dj-rest-auth/login/', loginData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            navigate('/posts');
        } catch (error) {
            console.log('An error occurred:', error.response);
            setError(error.response?.data);
        }
    };
    
    const handleChange = (event) => {
        setLoginData({
            // Remember to spread the signUpData object to keep the other values
            ...loginData,
            // Dynamically set the name of the field and the value
            [event.target.name]: event.target.value,
        });
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