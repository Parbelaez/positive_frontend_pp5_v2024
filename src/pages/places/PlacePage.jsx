import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../api/axiosDefaults";
import PlaceCard from "../../components/places/PlaceCard";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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
                <Col lg={6}>
                    {loading ? null : (
                        <PlaceCard {...place.results[0]} setPlaces={setPlace} />
                    )}
                </Col>
                <Col lg={1}></Col>
                <Col lg={5} className="d-none d-lg-block p-0 p-lg-2">
                    {loading ? null : <PostList place_id={id} />}
                </Col>
            </Row>
        </Container>
    );
};

export default PlacePage;
