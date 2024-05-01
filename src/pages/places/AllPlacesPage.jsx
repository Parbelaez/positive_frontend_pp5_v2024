import { useEffect, useState } from "react";
import { axiosResponse } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom";
import Asset from "../../components/Asset";
import { Button, Col, Container, Form, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import NoResults from "../../assets/no-results.jpg";
import PlaceCard from "../../components/places/PlaceCard";
import { axiosRequest } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const PlacesPage = ({ message }) => {
    const currentUser = useCurrentUser();
    const [places, setPlaces] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [searchEntry, setSearchEntry] = useState('');
    const [searchPlaceHolder, setSearchPlaceHolder] = useState('Search for a place');
    const [ownerFilter, setOwnerFilter] = useState(false);
    const [clear, setClear] = useState(false);


    const searchResults = async (searchEntry) => {
        if (searchEntry !== "") {
            setOwnerFilter(false);
            try {
                console.log('Search Results Routine',searchEntry);
                const response = await axiosRequest.get(
                    `/places/?search=${searchEntry}`
                );
                const results = response.data;
                setPlaces(results);
            } catch (error) {}
        } else {
            setSearchPlaceHolder("Please enter a place name");
        }
        console.log('Finish fetch: ',places);
    };

    const handleChange = () => (event) => {
        setSearchEntry(event.target.value);
    };

    const handleToggle = () => {
        setOwnerFilter(!ownerFilter);
    };

    useEffect(() => {
        console.log("Clear: ", clear);
        setClear(false);
        setOwnerFilter(false);
        console.log('Clear: ',clear);
        const getPlaces = async () => {
            try {
                await axiosResponse
                    .get("/places/")
                    .then((response) => setPlaces(response.data))
                    .then(setHasLoaded(true));
            } catch (error) {
                console.error(
                    "An error occurred, status:",
                    error.response.status
                );
            }
        };
        setHasLoaded(false);
        getPlaces();
    }, [ pathname, clear ]);

    return (
        <Container>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    <p>Most positive users Mobile</p>
                    <Row sm={1}>
                        {currentUser ? (
                            <Col lg={3} className="text-center">
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
                                        My Places
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Col>
                        ) : null}
                        <Col lg={6} className="text-center">
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder={searchPlaceHolder}
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchEntry}
                                    onChange={handleChange()}
                                />
                                <Button
                                    variant="outline-success"
                                    onClick={() => {
                                        console.log(
                                            "Search Button Clicked",
                                            searchEntry
                                        );
                                        searchResults(searchEntry);
                                    }}
                                >
                                    Search
                                </Button>
                            </Form>
                        </Col>
                        <Col lg={2} className="text-center">
                            <Button
                                variant="outline-danger"
                                onClick={() => {
                                    setClear(true);
                                }}
                            >
                                Clear
                            </Button>
                        </Col>
                    </Row>
                    {hasLoaded ? (
                        places.results.length ? (
                            ownerFilter ? (
                                places.results.filter(
                                    (place) => place.owner_id === currentUser.pk
                                ).length ? (
                                    <InfiniteScroll
                                        children={places.results
                                            .filter(
                                                (place) =>
                                                    place.owner_id ===
                                                    currentUser.pk
                                            )
                                            .map((place) => (
                                                <PlaceCard
                                                    key={place.id}
                                                    {...place}
                                                    setPlaces={setPlaces}
                                                />
                                            ))}
                                        dataLength={places.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!places.next}
                                        next={() => {
                                            fetchMoreData(places, setPlaces);
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
                                    children={places.results.map((place) => (
                                        <PlaceCard
                                            key={place.id}
                                            {...place}
                                            setPlaces={setPlaces}
                                        />
                                    ))}
                                    dataLength={places.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!places.next}
                                    next={() => {
                                        fetchMoreData(places, setPlaces);
                                    }}
                                />
                            )
                        ) : (
                            <Container>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )
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
        </Container>
    );
};

export default PlacesPage;
