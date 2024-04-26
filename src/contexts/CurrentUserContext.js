import { useState, createContext, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { axiosRequest, axiosResponse } from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(null);

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const handleMount = async () => {
        try {
            const { userData } = await axios.get('/dj-rest-auth/user/');
            setCurrentUser(userData);
        } catch (error) {
            console.error('An error occurred:', error.response);
        }
    }

    useEffect(() => {
        handleMount();
    }, []);

    useMemo(() => {
        axiosRequest.interceptors.request.use(
            async (config) => {
                if (shouldRefreshToken()) {
                try {
                    await axios.post('/dj-rest-auth/token/refresh/');
                } catch (error) {
                    setCurrentUser(prevCurrentUser => {
                        if (prevCurrentUser) {
                            navigate('/login');
                        }
                        return null;
                    });
                    removeTokenTimestamp();
                    return config;
                }
                    return config;
                }
            },
            (error) => Promise.reject(error)
        );

        axiosResponse.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response.status === 401) {
                    try {
                        await axios.post('/dj-rest-auth/token/refresh/');
                    } catch (error) {
                        setCurrentUser(prevCurrentUser => {
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
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}
