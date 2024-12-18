export const TOKEN = "token";
export const USER_INFO = "userInfo";
export const IS_LOGGED_IN = "isLoggedIn";

export const HEADER_HEIGHT = "64px";

const CREATE_ERROR_RESPONSE = (code, message) => ({
  code,
  data: null,
  isSuccess: false,
  message,
});

export const GET_ERROR = (error) => {
  const message = error?.response?.data?.message || error?.message;

  if (!error?.response) {
    if (error?.code === "ERR_NETWORK") {
      if (!navigator.onLine) {
        return CREATE_ERROR_RESPONSE(
          1000,
          "You are offline. Please check your internet connection."
        );
      } else {
        return CREATE_ERROR_RESPONSE(1001, "Some error occurred.");
      }
    }
  }

  return CREATE_ERROR_RESPONSE(error?.response?.status, message);
};
