import { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(null);

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

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
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}