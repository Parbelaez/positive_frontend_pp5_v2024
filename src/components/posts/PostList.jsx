import React, { useEffect, useState } from 'react'
import { axiosRequest } from '../../api/axiosDefaults';
import { Container, Row } from 'react-bootstrap';

const PostList = (place_id) => {
    const [postsData, setPostsData] = useState({
        pagePost: { results: [] },
        placePosts: { results: [] },
    });

    const { placePosts } = postsData;

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosRequest.get(
                    `/posts/?place=${place_id}`
                );
                setPostsData((prevState) => ({
                    ...prevState,
                    placePosts: data,
                }));
            } catch (error) {
                console.error(error);
            }
        };

        handleMount();
    }, [place_id]);

    return (
        <Container>
                {placePosts.results.map((post) => (
                    <Container key={post.id}>
                        <Row>
                            <h4>{post.title}</h4>
                            <p>{post.visit_date}</p>
                        </Row>
                    </Container>
                ))}
            </Container>
    )
}

export default PostList