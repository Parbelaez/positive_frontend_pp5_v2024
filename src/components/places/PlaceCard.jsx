import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../../styles/PlaceCard.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// const PlaceCard = ({ place }) => {
const PlaceCard = (props) => {
    const { 
        place_name,
        country,
        city,
        address,
        description,
        phone_number,
        website,
        email,
        image,
        num_posts,
        owner,
        owner_id
    } = props;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.pk === owner_id;

    return (
        <Container
            className={`${styles.content}`}
        >
            <Row className="justify-content-md-center">
                <Card style={{ width: "32rem" }}>
                    <Row className="justify-content-md-center">
                        <Card.Img
                            variant="top"
                            src={image}
                            className={`mt-2 ${styles.img}`}
                        />
                    </Row>
                    <Card.Body>
                        <Card.Title>
                            <p className="text-uppercase fw-bold">
                                {place_name}
                            </p>
                            <p className="text-muted fs-6">
                                ({country}, {city}, {address})
                            </p>
                        </Card.Title>
                        <Card.Text>{description}</Card.Text>
                        <p>Contact: {phone_number}</p>
                        <p>
                            {website}
                            {email}
                        </p>
                        <p>
                            {num_posts} person(s) have posted about this
                            place.
                        </p>
                        <p>
                            Thanks to{" "}
                            <span className={`${styles.boldText}`}>
                                {owner}
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
