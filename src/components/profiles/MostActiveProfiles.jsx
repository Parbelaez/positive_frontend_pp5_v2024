import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { axiosRequest } from '../../api/axiosDefaults';
import styles from '../../styles/MostActiveProfiles.module.css'

const MostActiveProfiles = () => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    mostActiveProfiles: { results: [] },
  });

  const { mostActiveProfiles } = profileData;

  useEffect(() => {
    // Once again, we need to use the then after the axios request
    // to get the data from the API. The biggest problem comes when the browser
    // has cached the previous render and tries to render once again the data before it is fetched.
    const handleMount = () => {
        axiosRequest
          .get("/profiles/?ordering=-num_places")
          .then(
            ({ data }) => {
                setProfileData((prevState) => ({
                    ...prevState,
                    mostActiveProfiles: data,
                }));
            })
          .catch((error) => {
              console.error(error);
            });
    };

    handleMount();
  }, []);

  return (
      <Container>
          <Row>
              <h3>Top 5 Active Profiles</h3>
          </Row>
          <Row>
              {mostActiveProfiles.results.slice(0, 5).map((profile) => (
                  <Container key={profile.id}>
                      <Row>
                          <Col>
                              <img
                                  src={profile.image}
                                  alt={profile.owner}
                                  className={styles.profileImage}
                              />
                          </Col>
                          <Col>
                              <h4>{profile.owner}</h4>
                              <p>{profile.num_places} places</p>
                          </Col>
                      </Row>
                  </Container>
              ))}
          </Row>
      </Container>
  );
}

export default MostActiveProfiles