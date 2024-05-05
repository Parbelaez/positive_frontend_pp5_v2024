import React, { createRef, useEffect, useState } from 'react'
import { Figure, Form, Image, Alert, Button, Modal } from 'react-bootstrap';
import { axiosRequest } from '../../api/axiosDefaults';

const ProfileEditForm = (props) => {
    const { id, profileData, setProfileData, setEditON } = props;
    const [show, setShow] = useState(true);
    const [errors, setErrors] = useState({});
    const imageInput = createRef();

    const handleClose = () => {
        setShow(false);
        setEditON(false);
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        handleShow();
    }, []);

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
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update your About You and/or Image
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <Modal.Footer>
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
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProfileEditForm