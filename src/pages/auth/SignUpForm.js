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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="username" />
                    </Form.Group>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <p>
                            Already have an account? <Link to="/signin">Login</Link>                                
                        </p>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                </Row>
            </Stack>
        </Container>
    );
}

export default SignUpForm;