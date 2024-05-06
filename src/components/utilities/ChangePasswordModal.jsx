import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { axiosResponse } from "../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";

const ChangePasswordModal = (props) => {
    const { profile_id, setChangePassword } = props;
    const [show, setShow] = useState(true);

    const [userData, setUserData] = useState({
        new_password1: "",
        new_password2: "",
    });

    const { new_password1, new_password2 } = userData;

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        setShow(false);
        setChangePassword(false);
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        handleShow();
    }
        , [profile_id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosResponse.post("/dj-rest-auth/password/change/", userData)
                .then(
                    () => {
                        handleClose();
                    }
            );
        } catch (error) {
            console.error("An error occurred:", error.response);
            setErrors(error.response.data);
        };
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Enter your new password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                name="new_password1"
                                value={new_password1}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        {errors?.new_password1?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat Password"
                                name="new_password2"
                                value={new_password2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Change Password
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangePasswordModal;
