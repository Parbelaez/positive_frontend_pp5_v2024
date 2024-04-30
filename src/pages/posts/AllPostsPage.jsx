import { useEffect, useState } from "react";
import { axiosResponse } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom";
import Asset from "../../components/Asset";
import { Col, Container, Row } from "react-bootstrap";
import NoResults from "../../assets/no-results.jpg";
import { default as Post } from "../../components/posts/PostPreview";

const Home = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const getPosts = async () => {
            try {
                await axiosResponse
                    .get("/posts/?{filter}")
                    .then((response) => setPosts(response.data))
                    .then(setHasLoaded(true));
            } catch (error) {
                console.error(
                    "An error occurred, status:",
                    error.response.status
                );
            }
        };
        setHasLoaded(false);
        getPosts();
    }, [filter, pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Most positive users Mobile</p>
                {hasLoaded ? (
                    <>
                        {posts.results.length ? (
                            posts.results.map((post) => (
                                <Post
                                    key={post.id}
                                    {...post}
                                    setPosts={setPosts}
                                />
                            ))
                        ) : (
                            <Container>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>Most positive users</p>
            </Col>
        </Row>
    );
};

export default Home;
