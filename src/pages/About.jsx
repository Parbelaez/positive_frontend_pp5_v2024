import { Container, Row, Col } from "react-bootstrap";


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
                </Col>
            </Row>
        </Container>
    );
}

export default About;
