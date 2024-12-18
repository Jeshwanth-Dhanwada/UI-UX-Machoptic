import { postRequest } from "./api.request";

const LOGIN_PATH = "/auth";

export const loginApi = async (body) => await postRequest(LOGIN_PATH, body);
