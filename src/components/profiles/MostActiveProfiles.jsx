import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { axiosRequest } from '../../api/axiosDefaults';
import styles from '../../styles/MostActiveProfiles.module.css'
import Asset from '../utilities/Asset';

const MostActiveProfiles = ({ orderCriteria, field }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
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
                .get(`/profiles/?ordering=${orderCriteria}`)
                .then(
                    ({ data }) => {
                        setProfileData((prevState) => ({
                            ...prevState,
                            mostActiveProfiles: data,
                        }));
                    })
                .then(setHasLoaded(true))
                .catch((error) => {
                    console.error(error);
                });
        };
        setHasLoaded(false);
        handleMount();
    }, [orderCriteria]);

    return (
        <Container>
            <br />
            <Row className="text-center">
                <h3>Top 5 Active Profiles</h3>
            </Row>
            <br />
            {!hasLoaded ? (
                <Container className="text-center">
                    <Asset spinner />
                </Container>
            ) : (
            <Row>
                {mostActiveProfiles.results.slice(0, 5).map((profile) => (
                    <Container key={profile.id}>
                        <Row>
                            <Col className="text-end">
                                <img
                                    src={profile.image}
                                    alt={profile.owner}
                                    className={styles.profileImage}
                                />
                            </Col>
                            <Col className="text-start">
                                <h4>{profile.owner}</h4>
                                <p>
                                    {field === 'places' ? profile.num_places : profile.num_posts} {field}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                ))}
                </Row>
            )}
        </Container>
    );
}

export default MostActiveProfiles