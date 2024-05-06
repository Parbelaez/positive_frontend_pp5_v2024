import { jwtDecode } from "jwt-decode";
import { axiosRequest } from "../api/axiosDefaults";


// Extract the timestamp and set it in localStorage
export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Check if the token is expired
export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
};

// Remove the timestamp from localStorage
export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};

// Fetch more data from the API
// used in the InfiniteScroll component
export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosRequest.get(resource.next);
        setResource( (prevResource) => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id) ? acc : [...acc, cur];
            }, prevResource.results)
        }));
    } catch (error) {
        console.error("An error occurred, status:", error.response.status);
    }
}
