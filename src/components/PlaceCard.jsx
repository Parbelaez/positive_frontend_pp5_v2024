import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/PlaceCard.module.css";

const PlaceCard = ({ place }) => {
    return (
        <Container
            className={`${styles.content} position-absolute top-50 start-50 translate-middle`}
        >
            <Row className="justify-content-md-center">
                <Card style={{ width: "60rem" }}>
                    <Card.Img
                        variant="top"
                        src={place.image}
                        className="img-fluid object-fit-cover border rounded mt-2"
                    />
                    <Card.Body>
                        <Card.Title>
                            <span className="text-uppercase fw-bold">
                                {place.place_name}
                            </span>
                            <span className="text-muted"> </span>
                            <span className="text-muted fs-6">
                                ({place.country}, {place.city}, {place.address})
                            </span>
                        </Card.Title>
                        <Card.Text>{place.description}</Card.Text>
                        <p>Contact: {place.phone_number}</p>
                        <p>
                            {place.website}
                            {place.email}
                        </p>
                        <p>
                            {place.num_posts} person(s) have posted about this
                            place.
                        </p>
                        <Button variant="primary">Post You Experience!</Button>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default PlaceCard;
