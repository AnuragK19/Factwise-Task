import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `/data`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
