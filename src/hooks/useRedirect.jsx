import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleMount = async () => {
            try {
                axios.post('/dj-rest-auth/token/refresh/')
                    // If the user is logged in, then the token can be refreshed
                    // This is a strategy to confirm it.
                    .then(
                        userAuthStatus === 'loggedIn' ? navigate('/') : null
                    );
            } catch (error) {
                console.error("An error occurred:", error.response);
                if (userAuthStatus === 'loggedOut') {
                    navigate('/login')
                }
            }
        }
        handleMount();
    }, [userAuthStatus, navigate]);
}