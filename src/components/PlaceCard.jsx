import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const PlaceCard = ({ place }) => {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={place.image} />
            <Card.Body>
                <Card.Title>{ place.place_name}</Card.Title>
                <Card.Text>
                    { place.description }
                </Card.Text>
                <p>
                    { place.country }, { place.city }
                </p>
                <p>
                    {place.address}
                </p>
                <Button variant="primary">Post You Experience!</Button>
            </Card.Body>
        </Card>
    );
};

export default PlaceCard;
