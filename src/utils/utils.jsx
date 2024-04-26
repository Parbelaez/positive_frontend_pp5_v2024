import { jwtDecode } from "jwt-decode";


export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
    console.log("shouldRefreshToken");
    const refreshtokenexists = !!localStorage.getItem("refreshTokenTimestamp");
    console.log("refreshTokenTimestamp exists ", refreshtokenexists);
    return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
    console.log("refreshTokenTimestamp removed");
};
