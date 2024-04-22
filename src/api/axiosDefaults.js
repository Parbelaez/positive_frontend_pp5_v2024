import axios from "axios";

axios.defaults.baseURL = "https://positive-api-55b6b5b25a88.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;