import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { axiosRequest } from "../api/axiosDefaults";


const CreatePlace = () => {
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
                    console.log("countries", countries); // Log the countries outside the promise
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    // The image should be sent as a FormData object
    const handleChange = (event) => {
        console.log('Change Triggered by: ', event.target.name, event.target.value);
        setPlaceData({
            ...placeData,
            [event.target.name]: event.target.value,
        });
        // Reset the cities when the country changes
        if (event.target.name === "country") {
            console.log('Country Selected: ', event.target.value);
            const selectedCountryCities = countries.find( n => {
                return n.country === event.target.value;
            }).cities;
            console.log('Cities: ', selectedCountryCities);
            setCities(selectedCountryCities)
        }
    };
        
    const handleChangeImage = (event) => {
        // handleChange for image field
        if (event.target.files.length) {
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
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosRequest.post("/places/", formData);
            navigate(`/places/${data.id}`);
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
                    <h1>Create Place Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="place_name">Place Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="place_name"
                                name="place_name"
                                value={placeData.place_name}
                                onChange={handleChange}
                            />
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <label htmlFor="place_type">Place Type</label>
                            <select
                                name="place_type"
                                className="form-control"
                                id="place_type"
                                onChange={handleSelect}
                            >
                                <option value="" selected disable hidden>
                                    Choose the type of place
                                </option>
                                <option value="restaurant">Restaurant</option>
                                <option value="bar">Bar</option>
                                <option value="hotel">Hotel</option>
                                <option value="museum">Museum</option>
                                <option value="park">Park</option>
                                <option value="beach">Beach</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={placeData.address}
                                onChange={handleChange}
                            />
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select
                                className="form-control"
                                id="country"
                                name="country"
                                value={placeData.country}
                                onChange={handleChange}
                            >
                                <option value="">Select a country</option>
                                {countries.map((country) => (
                                    <option value={country.country}>
                                        {country.country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <select
                                className="form-control"
                                id="city"
                                name="city"
                                value={placeData.city}
                                onChange={handleChange}
                            >
                                <option value="">Select a city</option>
                                {cities.map((city) => (
                                    <option value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <input
                                type="text"
                                className="form-control"
                                id="website"
                                name="website"
                                value={placeData.website}
                                onChange={handleChange}
                            />
                            {/* {errors.website && (
                        <div className="alert alert-danger">
                            {errors.website}
                        </div>
                    )} */}
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <label htmlFor="phone_number">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone_number"
                                name="phone_number"
                                value={placeData.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={placeData.description}
                                onChange={handleChange}
                            />
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </div>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <br />
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreatePlace;
