import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../api/axiosDefaults";
import PlaceCard from "../../components/places/PlaceCard";

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

    // return <div>{loading ? null : <PlaceCard place={place.results[0]} />}</div>;
    return <div>{loading ? null : <PlaceCard {...place.results[0]} setPlaces={setPlace} />}</div>;
};

export default PlacePage;
