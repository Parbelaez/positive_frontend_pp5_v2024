import Spinner from "react-bootstrap/Spinner"


const Asset = ({ spinner, src, message }) => {
    return (
        <div className="text-center">
            {spinner && <Spinner animation="border" />}
            {src && <img src={src} alt="message" className="img-fluid" />}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Asset;