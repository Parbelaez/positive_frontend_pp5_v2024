import { useState, createContext, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { axiosRequest, axiosResponse } from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleMount = async () => {
        try {
            await axiosResponse.get('/dj-rest-auth/user/')
                .then((response) => setCurrentUser(response.data));
        } catch (error) {
            console.error('An error occurred, status:', error.response.status);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (loading) {
            handleMount()
        }
    }, [loading]);

    // Here we are catching all incoming and outgoing requests
    // to check if the token is expired and if so, we refresh it.
    // and if the refresh token is expired, we redirect the user to the login page
    // and remove the timestamp from localStorage
    useMemo(() => {
        axiosRequest.interceptors.request.use(
            async (request) => {
                if (shouldRefreshToken()) {
                    try {
                        await axios.post('/dj-rest-auth/token/refresh/');
                    } catch (error) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate("/login");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                        return request;
                    };
                }
                return request;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        axiosResponse.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response.status === 401) {
                    try {
                        await axios.post('dj-rest-auth/token/refresh/');
                    } catch (error) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate('/login');
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                return axios(error.config)
                }
                return Promise.reject(error);
            }
        );
    }, [navigate]);


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {loading ? null : children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}
