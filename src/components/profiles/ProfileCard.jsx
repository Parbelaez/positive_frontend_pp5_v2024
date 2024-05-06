import React, { useState } from "react";
import styles from "../../styles/ProfileCard.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ChangePasswordModal from "../utilities/ChangePasswordModal";
import DeleteConfirm from "../utilities/DeleteConfirm";
import ProfileEditForm from "./ProfileEditForm";

const ProfileCard = (profile) => {
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

    const [editON, setEditON] = useState(false);
    const [profileData, setProfileData] = useState({
        first_name: first_name,
        last_name: last_name,
        email: email,
        about_you: about_you,
        image: image,
    });
    const [changePassword, setChangePassword] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleEdit = () => {
        setEditON(!editON);
    };

    const columnSize = editON ? 6 : 12;

    
    const handleChangePassword = () => {
        setChangePassword(true);
    };

    const handleDelete = () => {
        setShowDelete(true);
    }

    return (
        <Container className={`${styles.content}`}>
            {changePassword ? (
                <ChangePasswordModal
                    profile_id={id}
                    setChangePassword={setChangePassword}
                    profileCard
                />
            ) : null}
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
                            {is_owner && (
                                <Card.Title>
                                    <h3 className="text-muted fs-6">{email}</h3>
                                </Card.Title>
                            )}
                            <Card.Text>{profileData.about_you}</Card.Text>
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
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </Button>
                                    <span> </span>
                                    <Button
                                        variant="outline-primary"
                                        onClick={handleChangePassword}
                                    >
                                        Change Password
                                    </Button>
                                    <span> </span>
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            handleDelete("profile", id)
                                        }
                                    >
                                        Delete My Profile
                                    </Button>
                                </>
                            )}
                            {showDelete && (
                                <DeleteConfirm
                                    itemType="profile"
                                    id={id}
                                    setShowDelete={setShowDelete}
                                    profileCard
                                />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                {editON && (
                    <ProfileEditForm
                        id={id}
                        profileData={profileData}
                        setEditON={setEditON}
                        setProfileData={setProfileData}
                        profileCard
                    />
                )}
            </Row>
        </Container>
    );
};

export default ProfileCard;
