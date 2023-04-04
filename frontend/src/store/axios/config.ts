import axios from "axios";

export const api = axios.create({
  baseURL: "polynotes.cluster-2022-5.dopolytech.fr/",
  withCredentials: true,
});
