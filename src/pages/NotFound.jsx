import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>PAGE NOT FOUND</h1>
                    <p>
                        Sorry, the page you are looking for does not exist. But,
                        not to worry. You can always go back to the{" "}
                        <Link to={"/"}>home page</Link>.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;
