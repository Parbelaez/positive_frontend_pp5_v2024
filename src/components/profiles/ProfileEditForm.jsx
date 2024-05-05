import React, { createRef, useState } from 'react'
import { Col, Figure, Form, Image, Alert, Button } from 'react-bootstrap';
import { axiosRequest } from '../../api/axiosDefaults';

const ProfileEditForm = (props) => {
    const { id, profileData, setProfileData, setEditON } = props;

    const [errors, setErrors] = useState({});
    const imageInput = createRef();

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

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
        formData.append("about_you", profileData.about_you);
        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosRequest.put(`/profiles/${id}`, formData)
                .then((response) => {
                    response.status === 200 && setEditON(false);
                    setProfileData(response.data);
                });
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
                console.log(errors);
            }
        }
    };

    return (
        <Col lg={4}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">
                        About You
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        id="disabledTextInput"
                        name="about_you"
                        onChange={handleChange}
                        value={profileData.about_you}
                    />
                </Form.Group>
                <Form.Group>
                    <Figure>
                        <Image
                            src={profileData.image}
                            alt="profile image"
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
                <br />
                <Button type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
                <span> </span>
                <Button variant="secondary" onClick={() => setEditON(false)}>
                    Cancel
                </Button>
            </Form>
        </Col>
    );
}

export default ProfileEditForm