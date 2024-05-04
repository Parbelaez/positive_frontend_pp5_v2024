import { Container, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../../styles/PostCard.module.css";
import { axiosResponse } from "../../api/axiosDefaults";
import { useState } from "react";

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
    } = props;

    const [totalLikes, setTotalLikes ] = useState({
        numTops : num_tops,
        numLikes : num_likes,
        numDislikes : num_dislikes,
    });

    const [likeId, setLikeId] = useState(like_id);
    const [clickedLike, setClickedLike] = useState('');

    const handleLike = async (likeType) => {
        try {
            await axiosResponse.post("/likes/", {
                like_type: likeType,
                post: id,
            })
                .then((response) => {
                    setTotalLikes({
                        numTops: response.data.num_tops,
                        numLikes: response.data.num_likes,
                        numDislikes: response.data.num_dislikes,
                    });
                    setLikeId(response.data.like_id);
                    setClickedLike(likeType);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosResponse.delete(`/likes/${likeId}/`)
                .then((response) => {
                    setTotalLikes({
                        numTops: response.data.num_tops,
                        numLikes: response.data.num_likes,
                        numDislikes: response.data.num_dislikes,
                    });
                    setLikeId(response.data.like_id);
                })
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
                            ) : likeId !== null && like_type === "top" ? (
                                <i
                                    onClick={() => handleUnlike()}
                                    className={`fa-solid fa-hand-point-up ${styles.icon}`}
                                ></i>
                            ) : (
                                <i
                                    onClick={() => handleLike("top")}
                                    className={`fa-regular fa-hand-point-up ${styles.icon}`}
                                ></i>
                            )}
                            <span> </span>
                            {totalLikes.numTops} person(s) found this post
                            helpful.
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
                            ) : likeId !== null && like_type === "like" ? (
                                <i
                                    onClick={() => handleUnlike()}
                                    className={`fa-solid fa-thumbs-up ${styles.icon}`}
                                ></i>
                            ) : (
                                <i
                                    onClick={() => handleLike("like")}
                                    className={`fa-regular fa-thumbs-up ${styles.icon}`}
                                ></i>
                            )}
                            <span> </span> {totalLikes.numLikes} person(s) likes
                            this place.
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
                            ) : likeId !== null && like_type === "dislike" ? (
                                <i
                                    onClick={() => handleUnlike()}
                                    className={`fa-solid fa-thumbs-down ${styles.icon}`}
                                ></i>
                            ) : (
                                <i
                                    onClick={() => handleLike("dislike")}
                                    className={`fa-regular fa-thumbs-down ${styles.icon}`}
                                ></i>
                            )}
                            <span> </span>
                            {totalLikes.numDislikes} person(s) dislikes this
                            place.
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
