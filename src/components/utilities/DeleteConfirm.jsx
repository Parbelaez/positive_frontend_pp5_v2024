import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { axiosRequest } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const DeleteConfirm = (props) => {

    const { itemType, id, setShowDelete } = props;

    const [modalShow, setModalShow] = useState(true);
    const navigate = useNavigate();

    const handleModalClose = () => {
        setModalShow(false);
        setShowDelete(false);
    }

    const handleModalShow = () => setModalShow(true);

    useEffect(() => {
        handleModalShow();
    }
    , [id]);
    
    
    const handleDelete = async () => {
        // This function will delete the item from the database.
        // The item is passed as a prop from the parent component.
        // The handleClose function will close the modal.
        // The id is also passed as a prop from the parent component.
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