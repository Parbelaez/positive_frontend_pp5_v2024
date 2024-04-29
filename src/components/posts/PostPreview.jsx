import { Container, Row, } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../../styles/PostCard.module.css";
import { Link } from "react-router-dom";


const PostPreview = (props) => {
    const {
        id,
        image,
        title,
        place_name,
        place_city,
        place_country,
        place_address,
        visit_date,
        num_tops,
        num_likes,
        num_dislikes,
        owner,
        is_owner,
    } = props;

    const postURL = `/posts/${id}`;

    return (
        <Container className={`${styles.content}`}>
            <Row className="justify-content-md-center">
                <Card style={{ width: "32rem" }}>
                    <Row className="justify-content-md-center">
                        <Link to={postURL}>
                            <Card.Img
                                variant="top"
                                src={image}
                                className={`mt-2 ${styles.img}`}
                                />
                        </Link>
                    </Row>
                    <Card.Body>
                        <Card.Title>
                            <h2 className="text-uppercase fw-bold">{title}</h2>
                            <h3 className="text-muted fs-6">{place_name}</h3>
                            <h4 className="text-muted fs-6">
                                {place_city}, {place_country}
                                <br />
                                {place_address}
                            </h4>
                            <p className="text-muted fs-6">
                                Visted on: {visit_date}
                            </p>
                        </Card.Title>
                        <p className="text-muted fs-6">
                            <i
                                className={`fa-regular fa-hand-point-up ${styles.icon}`}
                            ></i>
                            <span> </span>
                            {num_tops} person(s) found this post helpful.
                        </p>
                        <p className="text-muted fs-6">
                            <i
                                className={`fa-regular fa-thumbs-up ${styles.icon}`}
                            ></i>
                            <span> </span>
                            {num_likes} person(s) likes this place.
                        </p>
                        <p className="text-muted fs-6">
                            <i
                                className={`fa-regular fa-thumbs-down ${styles.icon}`}
                            ></i>
                            <span> </span>
                            {num_dislikes} person(s) dislikes this place.
                        </p>
                        {is_owner ? (
                            <p>
                                You share this experience with us!
                            </p>) : (
                            <p>Thanks to{" "}
                                <span className={`${styles.boldText}`}>
                                    {owner}
                                </span>{" "}
                                for sharing her/his positive experience with us!
                            </p>
                        )}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default PostPreview;
