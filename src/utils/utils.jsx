import { jwtDecode } from "jwt-decode";
import { axiosRequest } from "../api/axiosDefaults";


export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};

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
