import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../api/axiosDefaults";
import PlaceCard from "../components/PlaceCard";



const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState({ results: [] });

    useEffect(() => {
        // This Handle Mount will fetch the place data from the API
        // and the posts associated with that place.
        const handleMount = async () => {
            try {
                const [{ data: place }] = await Promise.all([
                    axiosRequest.get(`/places/${id}/`),
                ]);
                setPlace({ results: [place] });
                console.log(place);
            } catch (error) {
                console.error('An error occurred:', error.response);
            }
        };
        handleMount();
    }, [id]);

    return (
        <div>
            { <PlaceCard place={place.results[0]} /> }
        </div>
    );
}
    
export default PlacePage;