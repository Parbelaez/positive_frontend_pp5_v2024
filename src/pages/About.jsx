import { Container, Row, Col } from "react-bootstrap";


function About() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>About</h1>
                    <p>
                        This is a simple application to demonstrate the use of
                        React Router.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
