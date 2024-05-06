import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosRequest } from "../../api/axiosDefaults";

const PlaceEditForm = () => {
    // A new axios instance for the country API
    const countryInstance = axios.create({
        baseURL: "https://countriesnow.space/api/v0.1/countries",
    });

    // Creation of the Place data to be sent to the backend
    const [placeData, setPlaceData] = useState({
        place_name: "",
        place_type: "",
        address: "",
        country: "",
        city: "",
        website: "",
        phone_number: "",
        description: "",
        image: null,
    });

    // Creation of the errors object to store the form validation errors
    const [errors, setErrors] = useState({});

    // Creation of the countries and cities state to store the fetched data
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    // Creation of the imageInput ref to access the file input
    const imageInput = useRef(null);

    const { id } = useParams();

    let navigate = useNavigate();

    const capitalizeFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // The image should be sent as a FormData object
    const handleChange = (event) => {
        setPlaceData({
            ...placeData,
            [event.target.name]: event.target.value,
        });
        // Reset the cities when the country changes
        if (event.target.name === "country") {
            const selectedCountryCities = countries.find((n) => {
                return n.country === event.target.value;
            }).cities;
            setCities(selectedCountryCities);
        }
    };

    // handleChange for image field
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(placeData.image);
            setPlaceData({
                ...placeData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSelect = (event) => {
        setPlaceData({
            ...placeData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("place_name", placeData.place_name);
        formData.append("place_type", placeData.place_type);
        formData.append("address", placeData.address);
        formData.append("country", placeData.country);
        formData.append("city", placeData.city);
        formData.append("website", placeData.website);
        formData.append("phone_number", placeData.phone_number);
        formData.append("description", placeData.description);
        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosRequest.put(`/places/${id}`, formData);
            navigate(`/places/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
                console.log(errors);
            }
        }
    };

    const getCountriesArray = async () => {
        try {
            const response = await countryInstance.get("/", {
                // Used to avoid CORS issues with the API
                withCredentials: false,
            });
            return response.data["data"]; // Return the data directly
        } catch (error) {
            console.error("An error occurred:", error.response);
            throw error;
        }
    };

    // On mount, get the countries and set the cities
    useEffect(
        () => {
            getCountriesArray()
                .then((countries) => {
                    setCountries(countries);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axiosRequest.get(`/places/${id}/`).then(({ data }) => {
                    if (data?.is_owner) {
                        setPlaceData({
                            place_name: data.place_name,
                            place_type: data.place_type,
                            address: data.address,
                            country: data.country,
                            city: data.city,
                            website: data.website,
                            phone_number: data.phone_number,
                            description: data.description,
                            image: data.image,
                        });
                    } else {
                        navigate(-1);
                    }
                });
            } catch (error) {
                console.error("An error occurred:", error.response);
            }
        };
        handleMount();
    }, [id, navigate,]);

    return (
        <Container>
            <Row>
                <Container className="position-absolute top-50 start-50 translate-middle">
                    <Row className="justify-content-md-center">
                        <Col xs md="4">
                            <Form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <Form.Label htmlFor="place_name">
                                        Place Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="place_name"
                                        name="place_name"
                                        value={placeData.place_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors?.place_name?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div className="form-group">
                                    <Form.Label htmlFor="place_type">
                                        Place Type
                                    </Form.Label>
                                    <Form.Select
                                        name="place_type"
                                        className="form-control"
                                        id="place_type"
                                        onChange={handleSelect}
                                    >
                                        <option
                                            value=""
                                            selected
                                            disable
                                            hidden
                                        >
                                            {capitalizeFirst(
                                                placeData.place_type
                                            ) || "Place Type"}
                                        </option>
                                        <option value="restaurant">
                                            Restaurant
                                        </option>
                                        <option value="bar">Bar</option>
                                        <option value="hotel">Hotel</option>
                                        <option value="museum">Museum</option>
                                        <option value="park">Park</option>
                                        <option value="beach">Beach</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                </div>
                                {errors?.place_type?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div className="form-group">
                                    <Form.Label htmlFor="address">
                                        Address
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        value={placeData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors?.address?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div className="form-group">
                                    <Form.Label htmlFor="country">
                                        Country
                                    </Form.Label>
                                    <Form.Select
                                        className="form-control"
                                        id="country"
                                        name="country"
                                        value={placeData.country}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            {placeData.country ||
                                                "Select a country"}
                                        </option>
                                        {countries.map((country) => (
                                            <option value={country.country}>
                                                {country.country}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                                {errors?.country?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div className="form-group">
                                    <Form.Label htmlFor="city">City</Form.Label>
                                    <Form.Select
                                        className="form-control"
                                        id="city"
                                        name="city"
                                        value={placeData.city}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            {placeData.city || "Select a city"}
                                        </option>
                                        {cities.map((city) => (
                                            <option value={city}>{city}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                {errors?.city?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div className="form-group">
                                    <Form.Label htmlFor="website">
                                        Website
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="website"
                                        name="website"
                                        value={placeData.website}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors?.website?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div className="form-group">
                                    <Form.Label htmlFor="phone_number">
                                        Phone Number
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="phone_number"
                                        name="phone_number"
                                        value={placeData.phone_number}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors?.phone_number?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div className="form-group">
                                    <Form.Label htmlFor="description">
                                        Description
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={placeData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors?.description?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <br />
                                <Row>
                                    <Col md={3}>
                                        <Button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col md={3}>
                                        <Button
                                            className="btn btn-secondary"
                                            onClick={() => navigate(-1)}
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        {placeData.image ? (
                            <Col xs md="4">
                                <Form.Group>
                                    <Figure>
                                        <Image
                                            src={placeData.image}
                                            alt="place"
                                            className="img-thumbnail rounded"
                                        />
                                    </Figure>
                                    {errors?.image?.map((message, idx) => (
                                        <Alert variant="warning" key={idx}>
                                            {message}
                                        </Alert>
                                    ))}
                                    <Form.Label>Change Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={handleChangeImage}
                                        ref={imageInput}
                                    />
                                </Form.Group>
                            </Col>
                        ) : null}
                        <Col xs md="6"></Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    );
};

export default PlaceEditForm;
