import { useEffect, useState } from "react";
import { axiosResponse } from "../../api/axiosDefaults";
import { Link, useLocation } from "react-router-dom";
import Asset from "../../components/utilities/Asset";
import { Col, Container, Row } from "react-bootstrap";
import NoResults from "../../assets/no-results.jpg";
import { default as Post } from "../../components/posts/PostPreview";
import MostActiveProfiles from "../../components/profiles/MostActiveProfiles";

const Home = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect((filter) => {
        const getPosts = async () => {
            try {
                await axiosResponse
                    .get(`/posts/?${filter}`)
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
        <Container>
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={7}>
                <Container>
                    <Row>
                        <Col>
                            <br />
                            <h4 className="fst-italic">
                                Want to share your experience too?
                                <span> </span>
                                <Link to="/new-post">Create a post</Link>
                            </h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                                            <Asset
                                                src={NoResults}
                                                message={message}
                                            />
                                        </Container>
                                    )}
                                </>
                            ) : (
                                <Container>
                                    <Asset spinner />
                                </Container>
                            )}
                        </Col>
                    </Row>
                </Container>
                </Col>
                <Col md={1}></Col>
            <Col sm={4} className="d-none d-lg-block p-0 p-lg-2">
                <MostActiveProfiles orderCriteria="-num_posts" field="posts" />
            </Col>
            </Row>
        </Container>
    );
};

export default Home;
