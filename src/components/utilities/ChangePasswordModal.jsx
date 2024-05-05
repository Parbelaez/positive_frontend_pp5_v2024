import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ChangePasswordModal = (props) => {
    const { profile_id, setChangePassword } = props;
    
    console.log("Entering change password modal: ", profile_id);
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        setChangePassword(false);
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        handleShow();
    }
    , [profile_id]);

    return (
        <>
            {console.log("Change Profile ID: ", profile_id, "Show: ", show)}
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
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat Password"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Change Password
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangePasswordModal;
