import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function About() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h1>About</h1>
                    <br />
                    <p>
                        In my experience as a movie and music reviewer, people
                        feel also attracted to check the negatively scored
                        movies. We humans are curious by nature, and we want to
                        know why a movie is so bad, or why a restaurant is so
                        bad. We even want to contradict others opinions, so we
                        also want to prove people wrong. This is why I believe
                        that a social network with only positive reviews will be
                        a success. Not only because really good places will have
                        more notoriety, but also because people won't have
                        information about bad places, so these places will need
                        to strive harder to at least, have presence in the
                        Internet.
                    </p>
                    <p>
                        Also, when one writes a negative review, it is very easy
                        to get carried away and write a very long one, losing
                        even scope. But, when one writes a positive review,
                        needs to really focus on explaining why the place is so
                        good, and this is a good exercise for the brain and
                        also, to hihglight why the place is worth visiting.
                    </p>
                    <p>
                        So, let's build up from postive experiences, and let's
                        make the world a better place by sharing what we loved
                        about a place and why we recommend it.
                    </p>
                    <br />
                    <br />
                    <h3>Disclaimer:</h3>
                    <p>
                        This is a project for educational purposes. The
                        information displayed here is not real, and the
                        experiences shared are fictional. This project is not
                        intended to be used for commercial purposes.
                    </p>
                    <br />
                    <p>
                        The images used for this project were taken from
                        <a href="https://www.freepik.com/free-vector/flat-design-no-data-illustration_47718913.htm#query=no%20results&position=3&from_view=keyword&track=ais&uuid=063231eb-eaf8-4121-a670-71b725ee4094">
                            Freepik.
                        </a>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
