import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosRequest } from "../../api/axiosDefaults";
import styles from "../../styles/NewPostForm.module.css";

const NewPostForm = () => {

    const location = useLocation();

    const place_id = location.state !== null ? location.state.id : "";
    const place_name = location.state !== null ? location.state.place_name : "";
    const country = location.state !== null ? location.state.country : "";
    const city = location.state !== null ? location.state.city : "";

    console.log("lo que recibí: ", place_id, place_name, country, city);
    
    // A new axios instance for the country API
    const countryInstance = axios.create({
        baseURL: "https://countriesnow.space/api/v0.1/countries",
    });

    // Creation of the Post data to be sent to the backend
    const [postData, setPostData] = useState({
        place: place_id ? place_id : "",
        title: "",
        visit_date: "",
        content: "",
        image: "",
        image_filter: "",
        recommendaton: "",
    });

    // Creation of the errors object to store the form validation errors
    const [errors, setErrors] = useState({});

    // Creation of the countries and cities state to store the fetched data
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const [places, setPlaces] = useState([]);

    // Creation of the imageInput ref to access the file input
    const imageInput = useRef(null);

    let navigate = useNavigate();

    // Use async/await or .then() to handle the response
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

    const getPlacesArray = async (country, city) => {
        try {
            const response = await axiosRequest.get(
                `/places/?country=${country}&city=${city}`
            );
            return response.data.results;
        } catch (error) {
            console.error("An error occurred:", error.response);
            throw error;
        }
    };

    const handleChange = (event) => {
        console.log("event.target.name: ", event.target.name);
        console.log("event.target.value: ", event.target.value);
            setPostData({
                ...postData,
                [event.target.name]: event.target.value,
            });
        // Reset the cities when the country changes
        if (event.target.name === "country") {
            const selectedCountryCities = countries.find((n) => {
                return n.country === event.target.value;
            }).cities;
            setCities(selectedCountryCities);
        } else if (event.target.name === "city") {
            getPlacesArray(postData.country, event.target.value)
                .then((places) => {
                    setPlaces(places);
                    console.log("places: " ,places);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(postData.image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("place", place_id ? place_id : postData.place);
        formData.append("title", postData.title);
        formData.append("visit_date", postData.visit_date);
        formData.append("content", postData.content);
        formData.append("image", imageInput.current.files[0]);
        formData.append("recommendaton", postData.recommendaton);

        console.log("formdata: ", formData, "postdata: ", postData);
        try {
            console.log("lo que voy a enviar a la DB: ", formData);
            const { data } = await axiosRequest.post("/posts/", formData);
            navigate(`/posts/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs md="6">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Form.Label htmlFor="country">Country</Form.Label>
                            {!!country ? (
                                <Form.Select disabled>
                                    <option value="country">{country}</option>
                                </Form.Select>
                            ) : (
                                <Form.Select
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    value={postData.country}
                                    onChange={handleChange}
                                >
                                    <option value="country">
                                        {!!country
                                            ? country
                                            : "Select a country"}
                                    </option>
                                    {countries.map((country) => (
                                        <option value={country.country}>
                                            {country.country}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                        </div>
                        {errors?.country?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <Form.Label htmlFor="city">City</Form.Label>
                            {!!city ? (
                                <Form.Select disabled>
                                    <option value="city">{city}</option>
                                </Form.Select>
                            ) : (
                                <Form.Select
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    value={postData.city}
                                    onChange={handleChange}
                                >
                                    <option value="city">Select a city</option>
                                    {cities.map((city) => (
                                        <option value={city}>{city}</option>
                                    ))}
                                </Form.Select>
                            )}
                        </div>
                        {errors?.city?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <Form.Label htmlFor="place_name">
                                Place Name
                            </Form.Label>
                            {!!place_id ? (
                                (console.log("place_id: ", place_id),
                                (
                                    <Form.Select disabled>
                                        <option key={place_id} value={place_id}>
                                            {place_name}
                                        </option>
                                    </Form.Select>
                                ))
                            ) : (
                                <Form.Select
                                    className="form-control"
                                    id="place"
                                    name="place"
                                    value={postData.place_name}
                                    onChange={handleChange}
                                >
                                    <option value="">"Select a place"</option>
                                    {places.length ? (
                                        places.map((place) => (
                                            <option
                                                key={place.id}
                                                value={place.id}
                                            >
                                                {place.place_name},{" "}
                                                {place.address}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">
                                            No places found
                                        </option>
                                    )}
                                </Form.Select>
                            )}
                            {errors.place && (
                                <div className="alert alert-danger">
                                    {errors.place}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={postData.title}
                                onChange={handleChange}
                            />
                            {errors.place_type && (
                                <div className="alert alert-danger">
                                    {errors.place_type}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <Form.Label htmlFor="visit_date">
                                Visit Date
                            </Form.Label>
                            <Form.Control
                                type="date"
                                className="form-control"
                                id="visit_date"
                                name="visit_date"
                                value={postData.visit_date}
                                onChange={handleChange}
                            />
                            {errors.visit_date && (
                                <div className="alert alert-danger">
                                    {errors.visit_date}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <Form.Label htmlFor="content">
                                Write your positive experience
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                className="form-control"
                                id="content"
                                name="content"
                                value={postData.content}
                                onChange={handleChange}
                            />
                            {errors?.content?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {errors.content}
                                </Alert>
                            ))}
                        </div>
                        <div className="form-group">
                            <Form.Label htmlFor="recommendation">
                                Recommendation
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="recommendation"
                                name="recommendation"
                                value={postData.recommendation}
                                onChange={handleChange}
                            />
                            {errors?.recommendation?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {errors.recommendation}
                                </Alert>
                            ))}
                        </div>
                        <div className="form-group">
                            <Form.Label htmlFor="image">Image</Form.Label>
                            <Form.Control
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {errors.image}
                                </Alert>
                            ))}
                        </div>
                        <br />
                        <Button type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </Button>
                        <br />
                        <br />
                        <p className={styles.disclaimer}>
                            Your post is your experience. Be aware that it will
                            be liked when someone agrees with your experience.
                            So, be clear and concise. This means, that you will
                            not be able to edit it later.
                        </p>
                        <p className={styles.disclaimer}>
                            Others will trust your words, so be honest and
                            positive
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default NewPostForm;
