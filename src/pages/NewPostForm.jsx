import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { axiosRequest } from "../api/axiosDefaults";


const NewPostForm = () => {
    // A new axios instance for the country API
    const countryInstance = axios.create({
        baseURL: "https://countriesnow.space/api/v0.1/countries",
    });

    // Creation of the Post data to be sent to the backend
    const [postData, setPostData] = useState({
        place_name: "",
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
    useEffect(() => {
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

    const getPlacesArray = async () => {
        try {
            const response = await axiosRequest.get("/places/");
            return response.data;
        } catch (error) {
            console.error("An error occurred:", error.response);
            throw error;
        }
    };

    useEffect(() => {
        getPlacesArray()
            .then((places) => {
                setPlaces(places);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [countries, cities]);


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
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
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
                            <label htmlFor="place_name">Place Name</label>
                            <select
                                className="form-control"
                                id="place_name"
                                name="place_name"
                                value={postData.place_name}
                                onChange={handleChange}
                            >
                                <option value="">Select a place</option>
                                {places.map((place) => (
                                    <option key={place.id} value={place.id}>
                                        {place.place_name}, {place.country},{place.city}
                                        , {place.address}
                                    </option>
                                ))}
                            </select>
                            {errors.place_name && (
                                <div className="alert alert-danger">
                                    {errors.place_name}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="visit_date">Visit Date</label>
                            <input
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
                            <label htmlFor="content">
                                Write your positive experience
                            </label>
                            <input
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
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                name="image"
                                value={postData.image}
                                onChange={handleChangeImage}
                            />
                            {errors.image && (
                                <div className="alert alert-danger">{errors.image}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="image_filter">Image Filter</label>
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
                            <label htmlFor="recommendation">Recommendation</label>
                            <input
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
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default NewPostForm;