import { Col, Container, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import PlaceCard from "../components/places/PlaceCard";
import Asset from "../components/Asset";
import { axiosResponse } from "../api/axiosDefaults";
import { useEffect, useState } from "react";

const TestPage = () => {
    const currentUser = useCurrentUser();
    const [places, setPlaces] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [ownerFilter, setOwnerFilter] = useState(false);

    const handleToggle = () => {
        setOwnerFilter(!ownerFilter);
        console.log(ownerFilter);
    }

    useEffect(() => {
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
        console.log(
            currentUser, currentUser.profile.id, places.results,
            places.results.filter(
                (place) => place.owner_id === currentUser.pk
            )
        );
    }, []);

    return (
        <div>
            {currentUser ? (
                <Col>
                    <ToggleButtonGroup
                        type="checkbox"
                        defaultValue={[null]}
                        className="mb-2"
                    >
                        <ToggleButton
                            id="tbg-check-1"
                            value={1}
                            onChange={handleToggle}
                        >
                            Show Me My Places
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            ) : null}
            {hasLoaded ? (
                ownerFilter ? (
                    places.results
                        .filter((place) => place.owner_id === currentUser.pk)
                        .map((place) => (
                            <PlaceCard
                                key={place.id}
                                {...place}
                                setPlaces={setPlaces}
                            />
                        ))
                ) : (
                    places.results.map((place) => (
                        <PlaceCard
                            key={place.id}
                            {...place}
                            setPlaces={setPlaces}
                        />
                    ))
                )
            ) : (
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </div>
    );
}

export default TestPage;