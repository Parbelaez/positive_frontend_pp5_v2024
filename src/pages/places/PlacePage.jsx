import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../api/axiosDefaults";
import PlaceCard from "../../components/places/PlaceCard";
import { Col, Container, Row } from "react-bootstrap";
import PostList from "../../components/posts/PostList";

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState({ results: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This Handle Mount will fetch the place data from the API
        // and the posts associated with that place.
        const handleMount = async () => {
            try {
                const [{ data: place }] = await Promise.all([
                    axiosRequest.get(`/places/${id}/`),
                ]);
                setPlace({ results: [place] });
            } catch (error) {
                console.error("An error occurred:", error.response);
            }
            setLoading(false);
        };
        if (loading) {
            handleMount();
        }
    }, [id, loading]);


    return (
        <Container>
            <Row>
                <Col>
                    {loading ? null : <PlaceCard {...place.results[0]} setPlaces={setPlace} />}
                </Col>
                <Col>
                    {loading ? null : <PostList />}
                </Col>
            </Row>
        </Container>)
};

export default PlacePage;
