import React, { useEffect, useState } from 'react'
import { axiosRequest } from '../../api/axiosDefaults';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/PostList.module.css';

const PostList = (place) => {
    const navigate = useNavigate();
    const [postsData, setPostsData] = useState({
        pagePost: { results: [] },
        placePosts: { results: [] },
    });

    const { placePosts } = postsData;

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axiosRequest.get(
                    `/posts/?place=${place.place_id}`
                )
                .then(
                    ({ data }) => setPostsData((prevState) => ({
                        ...prevState,
                        placePosts: data,
                })));
            } catch (error) {
                console.error(error);
            }
        };

        handleMount();
    }, [place]);

    return (
        <Container>
            <br />
            <Row className="text-center">
                <h3>Shared Experiences</h3>
            </Row>
            <br />
            {placePosts.results.map((post) => (
                <Container key={post.id} className="postContainer">
                    <Row>
                        <Col lg={3}>
                            <img
                                src={post.image}
                                alt={post.owner}
                                className={styles.postImage}
                                onClick={() => navigate(`/posts/${post.id}`)}
                            />
                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={8}>
                            <h5>{post.title}</h5>
                            <p className={styles.secondaryText}>
                                Visit: {post.visit_date}
                            </p>
                            <p className={styles.secondaryText}>
                                By: {post.owner}
                            </p>
                        </Col>
                    </Row>
                </Container>
            ))}
        </Container>
    );
}

export default PostList