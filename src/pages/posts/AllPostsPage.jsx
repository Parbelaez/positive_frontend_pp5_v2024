import { useEffect, useState } from "react";
import { axiosResponse } from "../../api/axiosDefaults";
import { Link, useLocation } from "react-router-dom";
import Asset from "../../components/utilities/Asset";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import NoResults from "../../assets/no-results.jpg";
import PostPreview from "../../components/posts/PostPreview";
import MostActiveProfiles from "../../components/profiles/MostActiveProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Home = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [ownerFilter, setOwnerFilter] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();

    const handleToggle = () => {
        setOwnerFilter(!ownerFilter);
    };

    useEffect((filter) => {
        setOwnerFilter(false);
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
    }, [filter, pathname, currentUser]);

    return (
        <Container>
            <Row className="gx-1">
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
                                <ToggleButtonGroup
                                    type="checkbox"
                                    defaultValue={[null]}
                                    className="mb-2"
                                >
                                    <ToggleButton
                                        variant={
                                            ownerFilter
                                                ? "secondary"
                                                : "primary"
                                        }
                                        id="tbg-check-1"
                                        value={1}
                                        onChange={handleToggle}
                                    >
                                        My Posts
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {/* checks if it has loaded, if so, checks that there is data,
                                and if there is, checks if My Posts filter has been activated.
                                Afterwards, filters the data to MY POST, and if I have created post, 
                                it will show them, if not -going upwards- will show an image
                                with no content found. */}
                                {hasLoaded ? (
                                    posts.results.length ? (
                                        ownerFilter ? (
                                            posts.results.filter(
                                                (post) => post.is_owner === true
                                            ).length ? (
                                                <InfiniteScroll
                                                    children={posts.results
                                                        .filter(
                                                            (post) =>
                                                                post.is_owner ===
                                                                true
                                                        )
                                                        .map((post) => (
                                                            <PostPreview
                                                                key={post.id}
                                                                {...post}
                                                                setPosts={
                                                                    setPosts
                                                                }
                                                            />
                                                        ))}
                                                    dataLength={
                                                        posts.results.length
                                                    }
                                                    loader={<Asset spinner />}
                                                    hasMore={!!posts.next}
                                                    next={() => {
                                                        fetchMoreData(
                                                            posts,
                                                            setPosts
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <Container>
                                                    <Asset
                                                        src={NoResults}
                                                        message={message}
                                                    />
                                                </Container>
                                            )
                                        ) : (
                                            <InfiniteScroll
                                                children={posts.results.map(
                                                    (post) => (
                                                        <PostPreview
                                                            key={post.id}
                                                            {...post}
                                                            setPosts={setPosts}
                                                        />
                                                    )
                                                )}
                                                dataLength={
                                                    posts.results.length
                                                }
                                                loader={<Asset spinner />}
                                                hasMore={!!posts.next}
                                                next={() => {
                                                    fetchMoreData(
                                                        posts,
                                                        setPosts
                                                    );
                                                }}
                                            />
                                        )
                                    ) : (
                                        <Container>
                                            <Asset
                                                src={NoResults}
                                                message={message}
                                            />
                                        </Container>
                                    )
                                ) : (
                                    <Container>
                                        <Asset spinner />
                                    </Container>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col sm={4} className="d-none d-lg-block p-0 p-lg-2">
                    <MostActiveProfiles
                        orderCriteria="-num_posts"
                        field="posts"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
