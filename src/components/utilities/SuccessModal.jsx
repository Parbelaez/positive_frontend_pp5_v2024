import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

const SuccessModal = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleShow();
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, your profile has been updated!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default SuccessModal