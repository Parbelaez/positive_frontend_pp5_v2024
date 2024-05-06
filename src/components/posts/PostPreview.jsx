import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import styles from "../../styles/PostPreview.module.css";
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
            <Card style={{ width: "40rem" }}>
                <Row className="justify-content-md-center">
                    <Col>
                        <Link to={postURL}>
                            <Card.Img
                                variant="top"
                                src={image}
                                className={`mt-2 ms-2 ${styles.img}`}
                            />
                        </Link>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title>
                                <h3 className="text-uppercase fw-bold">
                                    {title}
                                </h3>
                                <h3 className="text-muted fs-6">
                                    {place_name}
                                </h3>
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
                                    className={`fa-regular fa-hand-point-up`}
                                ></i>
                                <span> </span>
                                {num_tops}
                                <span> </span>
                                <i
                                    className={`fa-regular fa-thumbs-up`}
                                ></i>
                                <span> </span>
                                {num_likes}
                                <span> </span>
                                <i
                                    className={`fa-regular fa-thumbs-down`}
                                ></i>
                                <span> </span>
                                {num_dislikes}
                            </p>
                            {is_owner ? (
                                <p>You share this experience with us!</p>
                            ) : (
                                <p>
                                    Positive experience by: {" "}
                                    <span className={`${styles.boldText}`}>
                                        {owner}
                                    </span>{" "}
                                </p>
                            )}
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default PostPreview;
