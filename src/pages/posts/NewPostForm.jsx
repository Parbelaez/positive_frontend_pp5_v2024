import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Row, Col, Form } from "react-bootstrap";
import { axiosRequest } from "../../api/axiosDefaults";

const NewPostForm = () => {
    // A new axios instance for the country API
    const countryInstance = axios.create({
        baseURL: "https://countriesnow.space/api/v0.1/countries",
    });

    // Creation of the Post data to be sent to the backend
    const [postData, setPostData] = useState({
        place: "",
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
            const response = await axiosRequest.get(`/places/?country=${country}&city=${city}`);
            return response.data.results;
        } catch (error) {
            console.error("An error occurred:", error.response);
            throw error;
        }
    };

    const handleChange = (event) => {
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
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    };

    const handleChangeImage = (event) => {
        URL.revokeObjectURL(postData.image);
        if (event.target.files.length) {
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("place_name", postData.place_name);
        formData.append("title", postData.title);
        formData.append("visit_date", postData.visit_date);
        formData.append("content", postData.content);
        formData.append("image", postData.image);
        formData.append("image_filter", postData.image_filter);
        formData.append("recommendaton", postData.recommendaton);

        try {
            const { data } = await axiosRequest.post("/posts/", formData);
            navigate.push(`/posts/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container className="position-absolute top-50 start-50 translate-middle">
            <Row className="justify-content-md-center">
                <Col xs md="6">
                    <h1>Create Post Page</h1>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Form.Label htmlFor="country">Country</Form.Label>
                            <Form.Select
                                className="form-control"
                                id="country"
                                name="country"
                                value={postData.country}
                                onChange={handleChange}
                            >
                                <option value="">Select a country</option>
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
                                value={postData.city}
                                onChange={handleChange}
                            >
                                <option value="">Select a city</option>
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
                            <Form.Label htmlFor="place_name">
                                Place Name
                            </Form.Label>
                            <Form.Select
                                className="form-control"
                                id="place_name"
                                name="place_name"
                                value={postData.place_name}
                                onChange={handleChange}
                            >
                                <option value="">Select a place</option>
                                {places.length ? (
                                    places.map((place) => (
                                        <option key={place.id} value={place.id}>
                                            {place.place_name}, {place.address}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No places found</option>
                                )}
                            </Form.Select>
                            {errors.place_name && (
                                <div className="alert alert-danger">
                                    {errors.place_name}
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
                            {errors.address && (
                                <div className="alert alert-danger">
                                    {errors.address}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <Form.Label htmlFor="content">
                                Write your positive experience
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="content"
                                name="content"
                                value={postData.content}
                                onChange={handleChange}
                            />
                            {errors.country && (
                                <div className="alert alert-danger">
                                    {errors.country}
                                </div>
                            )}
                        </div>
                        {/* // !Change to the form for uploading images!!!!!!!!!!!!!! //
                        // !Change to bootstrap!!!!!!!!!!!!!! */}
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
                            {errors.image && (
                                <div className="alert alert-danger">
                                    {errors.image}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <Form.Label htmlFor="image_filter">
                                Image Filter
                            </Form.Label>
                            <input
                                type="text"
                                className="form-control"
                                id="image_filter"
                                name="image_filter"
                                value={postData.image_filter}
                                onChange={handleChange}
                            />
                            {errors.place_name && (
                                <div className="alert alert-danger">
                                    {errors.place_name}
                                </div>
                            )}
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
                            {errors.place_name && (
                                <div className="alert alert-danger">
                                    {errors.place_name}
                                </div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default NewPostForm;
