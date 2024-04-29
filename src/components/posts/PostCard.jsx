import { Container, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../../styles/PostCard.module.css";
import { axiosResponse } from "../../api/axiosDefaults";

const PostCard = (props) => {
    const {
        id,
        image,
        title,
        place_name,
        place_city,
        place_country,
        place_address,
        content,
        recommendation,
        visit_date,
        like_id,
        like_type,
        num_tops,
        num_likes,
        num_dislikes,
        owner,
        is_owner,
        setPosts,
    } = props;

    const handleLike = async (likeType) => {
        const like_increment = () => {
            console.log("Enter Increasing: ", likeType);
            switch (likeType) {
                case "top":
                    console.log("Incr. case top");
                    return "num_tops = num_tops + 1";
                case "like":
                    console.log("Incr. case like");
                    return "num_likes = num_likes + 1";
                case "dislike":
                    console.log("Incr. case dislike");
                    return "num_dislikes = num_dislikes + 1";
                default:
                    return;
            }
        };

        const like_calc = like_increment();

        try {
            const { data } = await axiosResponse.post("/likes/", {
                like_type: likeType,
                post: id,
            });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {
                            ...post,
                            like_calc,
                            like_id: data.id,
                        }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async (likeType) => {
        console.log("decreasing: ", likeType);
        const like_decrement = () => {
            switch (likeType) {
                case "top":
                    console.log("Decr. case top");
                    return "num_tops = num_tops - 1";
                case "like":
                    console.log("Decr. case like");
                    return "num_likes = num_likes - 1";
                case "dislike":
                    console.log("Decr. case dislike");
                    return "num_dislikes = num_dislikes - 1";
                default:
                    return;
            }
        };

        const like_calc = like_decrement();

        try {
            await axiosResponse.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {
                            ...post,
                            like_calc,
                            like_id: null,
                        }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
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
                        />
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
                        <Card.Text>{content}</Card.Text>
                        <p>Recommendation: {recommendation}</p>
                        <p className="text-muted fs-6">
                            {is_owner ? (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            You can't rate your own post!
                                        </Tooltip>
                                    }
                                >
                                    <i
                                        className={`fa-regular fa-hand-point-up ${styles.icon}`}
                                    ></i>
                                </OverlayTrigger>
                            ) : like_id && like_type === "top" ? (
                                <i
                                    onClick={() => handleUnlike("top")}
                                    className={`fa-solid fa-hand-point-up ${styles.icon}`}
                                ></i>
                            ) : (
                                <i
                                    onClick={() => handleLike("top")}
                                    className={`fa-regular fa-hand-point-up ${styles.icon}`}
                                ></i>
                            )}
                            <span> </span>
                            {num_tops} person(s) found this post helpful.
                            <br />
                            {is_owner ? (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            You can't like your own post!
                                        </Tooltip>
                                    }
                                >
                                    <i
                                        className={`fa-regular fa-thumbs-up ${styles.icon}`}
                                    ></i>
                                </OverlayTrigger>
                            ) : like_id && like_type === "like" ? (
                                <i
                                    onClick={() => handleUnlike("like")}
                                    className={`fa-solid fa-thumbs-up ${styles.icon}`}
                                ></i>
                            ) : (
                                <i
                                    onClick={() => handleLike("like")}
                                    className={`fa-regular fa-thumbs-up ${styles.icon}`}
                                ></i>
                            )}
                            <span> </span> {num_likes} person(s) likes this
                            place.
                            <br />
                            <span> </span>
                            {is_owner ? (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            You can't unlike your own post!
                                        </Tooltip>
                                    }
                                >
                                    <i
                                        className={`fa-regular fa-thumbs-down ${styles.icon}`}
                                    ></i>
                                </OverlayTrigger>
                            ) : like_id && like_type === "dislike" ? (
                                <i
                                    onClick={() => handleUnlike("dislike")}
                                    className={`fa-solid fa-thumbs-down ${styles.icon}`}
                                ></i>
                            ) : (
                                <i
                                    onClick={() => handleLike("dislike")}
                                    className={`fa-regular fa-thumbs-down ${styles.icon}`}
                                ></i>
                            )}
                            <span> </span>
                            {num_dislikes} person(s) dislikes this place.
                        </p>
                        <p>
                            Thanks to{" "}
                            <span className={`${styles.boldText}`}>
                                {owner}
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
