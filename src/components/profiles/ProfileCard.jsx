import React from 'react'
import styles from '../../styles/ProfileCard.module.css'
import { Button, Card, Container, Row } from 'react-bootstrap'

const ProfileCard = (profile) => {

  const {
    owner,
    first_name,
    last_name,
    image,
    about_you,
    num_places,
    num_posts,
    is_owner
  } = profile.profile

  console.log("ProfileCard: ", profile.profile)

  return (
      <Container className={`${styles.content}`}>
          <Row className="justify-content-md-center">
              <Card style={{ width: "32rem" }}>
                  <Row className="justify-content-md-center">
                      <Card.Img
                          variant="top"
                          src={image}
                          className={`mt-2 ${styles.img}`}
                      />
                  </Row>
                  <Card.Body>
                      <Card.Title>
                          <h2 className="text-uppercase fw-bold">{owner}</h2>
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
                            <Button variant="secondary">Edit Profile</Button>
                            <span> </span>
                            <Button variant="danger">Delete My Profile</Button>
                          </>
                        )}
                </Card.Body>
                </Card>
                </Row>
                </Container>
  );
}

export default ProfileCard