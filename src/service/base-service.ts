import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IResponse } from "../utility/interfaces/Response.ts";
import { HttpStatusCodes } from "../utility/enums/http-status-codes.ts";
import { BASE_URL } from "../config/index.ts";
axios.interceptors.request.use(
  async (config: any) => {
    let isTokenRequired = true;
    if (config.url.includes("/Auth/refresh-token")) {
      isTokenRequired = false;
    }
    if (config.url && !config.url.includes(BASE_URL)) {
      config.url = BASE_URL + config.url;
    }
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.auth_token = `${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse<IResponse<string>>) => {
    const message = response?.data?.message;
    if (message) {
      toast.success(message);
    }
    return response;
  },
  (error: AxiosError<IResponse<string>>) => {
    switch (error.response?.status) {
      case HttpStatusCodes.Unauthorized:
        toast.error("Unauthorized");
        break;
      case HttpStatusCodes.Forbidden:
        toast.error("Unauthorized");
        break;
      case HttpStatusCodes.InternalServerError:
        toast.error(error.response?.data?.message);
        break;
      case HttpStatusCodes.NotFound:
        toast.error(error.response?.data?.message);
        break;
      case HttpStatusCodes.NotAcceptable:
        toast.error(error.response?.data?.message);
        break;
      default:
    }
    return Promise.reject(error);
  }
);

const axiosService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default axiosService;
