import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleMount = async () => {
            console.log('useRedirect', userAuthStatus);
            try {
                axios.post('/dj-rest-auth/user/')
                    // If the user is logged in, then the token can be refreshed
                    // This is a strategy to confirm it.
                    .then((response) => {
                        console.log(response);
                        // if (userAuthStatus === 'loggedIn') {
                        //     navigate('/')
                        // } else null;
                    }
                    )
            } catch (error) {
                console.error("An error occurred:", error.response);
                if (userAuthStatus === 'loggedOut') {
                    navigate('/')
                }
            }
        }
        handleMount();
    }, [userAuthStatus, navigate]);
}