import { Container, Row, Col } from "react-bootstrap";

function NotFound() {
  return (
    <Container>
        <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>PAGE NOT FOUND</h1>
                    <p>
                        Sorry, the page you are looking for does not exist.
                        But, not to worry. You can always go back to the home page.
                    </p>
                </Col>
        </Row>
    </Container>
    );
}

export default NotFound;