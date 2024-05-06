import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../../styles/PlaceCard.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../../api/axiosDefaults";


const PlaceCard = (props) => {
    const {
        id,
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

    console.log(id, place_name, country, city);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.pk === owner_id;
    const navigate = useNavigate();

    const handleDelete = () => {
        return async () => {
            try {
                await axiosRequest.delete(`/places/${props.id}/`)
                    .then(() => navigate(-1));
            } catch (error) {
                console.error("An error occurred:", error.response);
            }
        };
    };

    const handleEdit = () => {
        return () => {
            navigate(`/places/${props.id}/edit`);
        };
    };

    const handlePostCreation = (id, place_name, country, city) => {
        return () => {
            console.log("Lo que envié: ", id, place_name, country, city);
            navigate("/new-post", {
                state: { id, place_name, country, city },
            });
        };
    };
        

    return (
        <Container className={`${styles.content}`}>
            <Row className="justify-content-md-center">
                <Card style={{ width: "32rem" }}>
                    <Row className="justify-content-md-center">
                        <Card.Img
                            variant="top"
                            src={image}
                            className={`mt-2 ${styles.img}`}
                            onClick={() => navigate(`/places/${id}`)}
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
                            {num_posts} person(s) have posted about this place.
                        </p>
                        <p>
                            Thanks to{" "}
                            <span className={`${styles.boldText}`}>
                                {owner}
                            </span>{" "}
                            for sharing this place with us!
                        </p>
                        <Button
                            variant="primary"
                            onClick={
                                handlePostCreation(id, place_name, country, city)
                            }
                        >
                            Post You Experience!
                        </Button>
                        <span> </span>
                        {is_owner && (
                            <Button variant="secondary" onClick={handleEdit()}>
                                Edit Place
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default PlaceCard;
