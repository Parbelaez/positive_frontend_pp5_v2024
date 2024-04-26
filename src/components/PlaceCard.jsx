import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/PlaceCard.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const PlaceCard = ({ place }) => {

    const currentUser = useCurrentUser();
    console.log('logged user: ', currentUser.pk);
    console.log("place owner: ", place.owner_id);
    const is_owner = currentUser?.pk === place.owner_id;
    console.log("is owner: ", is_owner, currentUser?.id, place.owner_id);

    return (
        <Container
            className={`${styles.content} position-absolute top-50 start-50 translate-middle`}
        >
            <Row className="justify-content-md-center">
                <Card style={{ width: "32rem" }}>
                    <Row className="justify-content-md-center">
                    <Card.Img
                        variant="top"
                        src={place.image}
                        className={`mt-2 ${styles.img}`}
                        />
                    </Row>
                    <Card.Body>
                        <Card.Title>
                            <p className="text-uppercase fw-bold">
                                {place.place_name}
                            </p>
                            <p className="text-muted fs-6">
                                ({place.country}, {place.city}, {place.address})
                            </p>
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
                        <p>
                            Thanks to{" "}
                            <span className={`${styles.boldText}`}>
                                {place.owner}
                            </span>{" "}
                            for sharing this place with us!
                        </p>
                        <Button variant="primary">Post You Experience!</Button>
                        <span> </span>
                        {is_owner && (
                            <Button variant="secondary">Edit Place</Button>
                        )}
                        <span> </span>
                        {is_owner && (
                            <Button variant="danger">Delete Place</Button>
                        )}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default PlaceCard;
