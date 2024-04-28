import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/PostCard.module.css";


const PostCard = ({ post }) => {

    return (
        <Container className={`${styles.content}`}>
            <Row className="justify-content-md-center">
                <Card style={{ width: "32rem" }}>
                    <Row className="justify-content-md-center">
                        <Card.Img
                            variant="top"
                            src={post.image}
                            className={`mt-2 ${styles.img}`}
                        />
                    </Row>
                    <Card.Body>
                        <Card.Title>
                            <h2 className="text-uppercase fw-bold">
                                {post.title}
                            </h2>
                            <h3 className="text-muted fs-6">
                                {post.place_name}
                            </h3>
                            <h4 className="text-muted fs-6">
                                {post.place_city}, {post.place_country}
                                <br />
                                {post.place_address}
                            </h4>
                            <p className="text-muted fs-6">
                                Visted on: {post.visit_date}
                            </p>
                        </Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <p>Recommendation: {post.recommendation}</p>
                        <p className="text-muted fs-6">
                            {post.like_id && post.liketype === "Top" ? (
                                <i class="fa-solid fa-hand-point-up"></i>
                            ) : (
                                <i class="fa-regular fa-hand-point-up"></i>
                            )}
                            <span> </span>
                            {post.num_tops} person(s) found this post helpful.
                            <br />
                            {post.like_id && post.liketype === "Like" ? (
                                <i class="fa-solid fa-thumbs-up"></i>
                            ) : (
                                <i class="fa-regular fa-thumbs-up"></i>
                            )}
                            <span> </span> {post.num_likes} person(s) likes this
                            place.
                            <br />
                            {post.like_id && post.liketype === "Dislike" ? (
                                <i class="fa-solid fa-thumbs-down"></i>
                            ) : (
                                <i class="fa-regular fa-thumbs-down"></i>
                            )}
                            <span> </span>
                            {post.num_dislikes} person(s) dislikes this place.
                        </p>
                        <p>
                            Thanks to{" "}
                            <span className={`${styles.boldText}`}>
                                {post.owner}
                            </span>{" "}
                            for sharing her/his positive experience with us!
                        </p>
                        {post.is_owner && (
                            <Button variant="secondary">Edit Post</Button>
                        )}
                        <span> </span>
                        {post.is_owner && (
                            <Button variant="danger">Delete Post</Button>
                        )}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default PostCard;
