import { useEffect, useState } from "react";
import { axiosResponse } from "../../api/axiosDefaults";
import { Link, useLocation } from "react-router-dom";
import Asset from "../../components/utilities/Asset";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import NoResults from "../../assets/no-results.jpg";
import PlaceCard from "../../components/places/PlaceCard";
import { axiosRequest } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import MostActiveProfiles from "../../components/profiles/MostActiveProfiles";

const PlacesPage = ({ message }) => {
    const currentUser = useCurrentUser();
    const [places, setPlaces] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [searchEntry, setSearchEntry] = useState('');
    const [searchPlaceHolder, setSearchPlaceHolder] = useState('Enter a place, country or city');
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
            setSearchPlaceHolder("Please enter a place name, country or city");
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
    }, [ pathname, clear, currentUser ]);

    return (
        <Container>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={6}>
                    <Container>
                        <Row>
                            <Col>
                                <h4 className="fst-italic">
                                    Been somewhere?
                                    <span> </span>
                                    <Link to="/create-place">
                                        Create that place
                                    </Link>
                                </h4>
                                <br />
                            </Col>
                        </Row>
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
                            <Col lg={7} className="text-center">
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
                        {/* checks if it has loaded, if so, checks that there is data,
                                and if there is, checks if My Places filter has been activated.
                                Afterwards, filters the data to MY PLACES, and if I have created a place or more, 
                                it will show them, if not -going upwards- will show an image
                                with no content found. */}
                        {hasLoaded ? (
                            places.results.length ? (
                                ownerFilter ? (
                                    places.results.filter(
                                        (place) =>
                                            place.owner_id === currentUser.pk
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
                                                fetchMoreData(
                                                    places,
                                                    setPlaces
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
                                        children={places.results.map(
                                            (place) => (
                                                <PlaceCard
                                                    key={place.id}
                                                    {...place}
                                                    setPlaces={setPlaces}
                                                />
                                            )
                                        )}
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
                    </Container>
                </Col>
                <Col md={1}></Col>
                <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                    <MostActiveProfiles
                        orderCriteria="-num_places"
                        field="places"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default PlacesPage;
