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
            await axiosResponse.get('/dj-rest-auth/user/');
            // setCurrentUser(userData);
        } catch (error) {
            console.error('An error occurred, status:', error.response.status);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (loading) {
            handleMount()
        }
    }, []);

    useMemo(() => {
        axiosRequest.interceptors.request.use(
            async (config) => {
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
                        return config;
                    };
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        axiosResponse.interceptors.response.use(
            (response) => {
                console.log('Exiting Response Interc. wtih response: ', response);
                setCurrentUser(response.data);
                return response;
            },
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
