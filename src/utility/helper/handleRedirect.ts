import { NavigateFunction } from "react-router-dom";
import { RoutePaths } from "../enums/router.enums.ts";
import { toast } from "react-toastify";

let hasRedirected = false; // Flag to track if redirect has already occurred

export const handleRedirect = (error: any, navigate: NavigateFunction) => {
    if (hasRedirected) return; // Prevent multiple redirects

    const statusCode = error?.response?.status;
    const errorCode = error?.response?.data?.code;

    if (statusCode === 500 || errorCode === 401) {
        hasRedirected = true;
        toast.error("Please Login Again");
        navigate(RoutePaths.SignIn);
    }
};
