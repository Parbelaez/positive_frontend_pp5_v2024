import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirm = ({ show, handleClose, handleDelete, item }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        // This function will delete the item from the database.
        // The item is passed as a prop from the parent component.
        // The handleClose function will close the modal.
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>{`Are you sure you want to delete this ${item}?`}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteConfirm;