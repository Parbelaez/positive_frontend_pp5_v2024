import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/PlaceCard.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";


const PostCard = ({ post }) => {

    const currentUser = useCurrentUser();
    console.log('logged user: ', currentUser.pk);
    console.log("post owner: ", post.owner_id);
    const is_owner = currentUser?.pk === post.owner_id;
    console.log("is owner: ", is_owner, currentUser?.id, post.owner_id);

    return (
        <Container
            className={`${styles.content} position-absolute top-50 start-50 translate-middle`}
        >
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
                                {post.city}, {post.country}
                                <br />
                                {post.address}
                            </h4>
                            <p className="text-muted fs-6">
                                Visted on: {post.visit_date}
                            </p>
                        </Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <p>Recommendation: {post.recommendation}</p>
                        <p className="text-muted fs-6">
                            {post.num_tops} person(s) found this post helpful.
                            <br />
                            {post.num_likes} person(s) likes this place.
                            <br />
                            {post.num_dislikes} person(s) dislikes this place.
                        <p>
                            Thanks to{" "}
                            <span className={`${styles.boldText}`}>
                                {post.owner}
                            </span>{" "}
                            for sharing her/his positive experience with us!
                        </p>
                        {is_owner && (
                            <Button variant="secondary">Edit Post</Button>
                        )}
                        <span> </span>
                        {is_owner && (
                            <Button variant="danger">Delete Post</Button>
                        )}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default PostCard;
