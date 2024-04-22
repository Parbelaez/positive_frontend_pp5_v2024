import { Col, Container, Row, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function SignUpForm() {
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
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="username" name='username'/>
                    </Form.Group>

                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password1'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Control type="password" placeholder="Please, re-enter the password" name='password2' />
                        </Form.Group>
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