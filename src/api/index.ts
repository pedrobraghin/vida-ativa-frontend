import axios from "axios";
import config from "../../config/config.json";
import CookieManager from "@react-native-cookies/cookies";
import Config from "../../config/config.json";

const api = axios.create({
  baseURL: config.api_url,
  withCredentials: true,
});

api.interceptors.response.use(async (response) => {
  if (response.headers["set-cookie"]) {
    await CookieManager.setFromResponse(
      Config.api_url,
      response.headers["set-cookie"][0]
    );
  }
  return response;
});

export default api;
