import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { axiosRequest } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const DeleteConfirm = ({ itemType, id }) => {

    console.log("Entering delete confirm: ", itemType, id);

    const [modalShow, setModalShow] = useState(true);
    console.log("Modal show: ", modalShow);
    const navigate = useNavigate();

    const handleModalClose = () => setModalShow(false);

    const handleModalShow = () => setModalShow(true);
    
    const handleDelete = async () => {
        // This function will delete the item from the database.
        // The item is passed as a prop from the parent component.
        // The handleClose function will close the modal.
        // The id is also passed as a prop from the parent component.

        console.log("Deleting: ", itemType, id);

        try {
            await axiosRequest
                .delete(`/${itemType}s/${id}/`)
                .then(() => handleModalClose());
        } catch (error) {
            console.error("An error occurred:", error.response);
        }
        navigate(`/${itemType}s`);
    }


    return (
        <Modal show={modalShow} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>{`Are you sure you want to delete this ${itemType}?`}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
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