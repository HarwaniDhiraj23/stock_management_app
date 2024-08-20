import { AxiosResponse } from "axios";
import httpClient from "./base-service.ts";
import { IResponse } from "../utility/interfaces/Response";
import { SignInInitialValue, SignUpInitialValue, ForgotPasswordInitialValue, ResetPasswordWithTokenInitialValue, NotificationStatus } from "../utility/interfaces/IRoute";

interface UserSignIn {
    first_name: string;
    last_name: string;
    birthday: Date | null;
    gender: string | null;
    phone_number: string;
    address: string;
    block_no: string;
    city: string;
    state: string;
    zip: string;
}

const login = async (
    userSignIn: SignInInitialValue
): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`signIn`, userSignIn);

const add = async (
    userSignIn: SignUpInitialValue
): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`signUp`, userSignIn);

const forgotPassword = async (
    userSignIn: ForgotPasswordInitialValue): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`forgotPassword`, userSignIn);

const resetPassword = async (
    userSignIn: ResetPasswordWithTokenInitialValue): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`resetPassword`, userSignIn);

const getUserProfile = async (): Promise<AxiosResponse<IResponse<{}>>> => httpClient.get<IResponse<{}>>(`getUserProfile`);

const uploadProfilePic = async (imageFile: File): Promise<AxiosResponse<IResponse<{}>>> => {
    const formData = new FormData();
    formData.append("image1", imageFile);

    return httpClient.post<IResponse<{}>>('updateProfilePic', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const uploadCoverPic = async (imageFile: File): Promise<AxiosResponse<IResponse<{}>>> => {
    const formData = new FormData();
    formData.append("image2", imageFile);

    return httpClient.post<IResponse<{}>>('updateCoverPic', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
const updateUserDetail = async (
    userSignIn: UserSignIn): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`updateUserInfo`, userSignIn);

const updateNotificationStatus = async (
    userSignIn: NotificationStatus): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`updateNotificationStatus`, userSignIn);


const createUserInfo = async (
    userSignIn: UserSignIn): Promise<AxiosResponse<IResponse<{}>>> =>
    httpClient.post<IResponse<{}>>(`addUserInfo`, userSignIn);

const UserApi = {
    createUser: add,
    loginUser: login,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    getUserProfile: getUserProfile,
    uploadProfilePic: uploadProfilePic,
    uploadCoverPic: uploadCoverPic,
    updateUserDetail: updateUserDetail,
    updateNotificationStatus: updateNotificationStatus,
    createUserInfo: createUserInfo
};

export default UserApi;