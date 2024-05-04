import React, { createRef, useState } from "react";
import styles from "../../styles/ProfileCard.module.css";
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Figure,
    Form,
    Image,
    Row,
} from "react-bootstrap";
import { axiosRequest } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const ProfileCard = (profile) => {
    const navigate = useNavigate();
    const [editON, setEditON] = useState(false);
    const [profileData, setProfileData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        about_you: "",
        image: null,
    });
    const [errors, setErrors] = useState({});
    const imageInput = createRef();

    const {
        id,
        owner,
        first_name,
        last_name,
        email,
        image,
        about_you,
        num_places,
        num_posts,
        is_owner,
    } = profile.profile;

    const handleClick = () => {
        setEditON(true);
    };

    const columnSize = editON ? 6 : 12;

    // handleChange for image field
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(profileData.image);
            setProfileData({
                ...profileData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append(first_name, profileData.first_name);
        formData.append(last_name, profileData.last_name);
        formData.append(email, profileData.email);
        formData.append(about_you, profileData.about_you);
        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosRequest.put(`/profiles/${id}`, formData);
            navigate(`/places/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
                console.log(errors);
            }
        }
    };

    return (
        console.log("editON", editON),
        (
            <Container className={`${styles.content}`}>
                <Row>
                    <Col lg={columnSize}>
                        <Card style={{ width: "32rem" }}>
                            <Row>
                                <Card.Img
                                    variant="top"
                                    src={image}
                                    className={`mt-2 ${styles.img}`}
                                />
                            </Row>
                            <Card.Body>
                                <Card.Title>
                                    <h2 className="text-uppercase fw-bold">
                                        {owner}
                                    </h2>
                                    <h3 className="text-muted fs-6">
                                        {first_name} {last_name}
                                    </h3>
                                </Card.Title>
                                <Card.Text>{about_you}</Card.Text>
                                <p className="text-muted fs-6">
                                    <i
                                        className={`fa-solid fa-location-dot ${styles.icon}`}
                                    ></i>
                                    <span> </span>
                                    {`${num_places} place(s) created.`}
                                </p>
                                <p className="text-muted fs-6">
                                    <i
                                        className={`fa-regular fa-note-sticky ${styles.icon}`}
                                    ></i>
                                    <span> </span>
                                    {`${num_posts} shared experience(s).`}
                                </p>
                                <br />
                                {is_owner && (
                                    <>
                                        <Button
                                            variant="secondary"
                                            onClick={handleClick}
                                        >
                                            Edit Profile
                                        </Button>
                                        <span> </span>
                                        <Button variant="danger">
                                            Delete My Profile
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">
                                    First Name
                                </Form.Label>
                                <Form.Control
                                    id="disabledTextInput"
                                    placeholder="First Name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">
                                    Last Name
                                </Form.Label>
                                <Form.Control
                                    id="disabledTextInput"
                                    placeholder="Last Name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">
                                    Email
                                </Form.Label>
                                <Form.Control
                                    id="disabledTextInput"
                                    placeholder="Email"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Figure>
                                    <Image
                                        src={image}
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
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">
                                    About You
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    id="disabledTextInput"
                                    placeholder="About You"
                                />
                            </Form.Group>
                            <Button type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <span> </span>
                            <Button
                                variant="secondary"
                                onClick={() => setEditON(false)}
                            >
                                Cancel
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    );
};

export default ProfileCard;
