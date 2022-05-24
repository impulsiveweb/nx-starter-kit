import Axios from "axios";

const API = Axios.create({
  baseURL: process.env.WEB_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "",
  },
});

export default API;