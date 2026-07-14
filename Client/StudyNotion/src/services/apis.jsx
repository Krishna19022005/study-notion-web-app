const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
  CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
};

//Auth Endpoints
export const endpoints = {
  SENDOTP_API:BASE_URL+"/auth/sendOTP",
  SIGNUP_API:BASE_URL+"/auth/signUp",
  LOGIN_API:BASE_URL+"/auth/login",
  RESETPASSWORDTOKEN_API:BASE_URL+"/auth/reset-password-token",
  RESETPASSWORD_API:BASE_URL+"/auth/reset-password",
}

//contact us endpoint
export const contactusEndpoint = {
  CONTACT_US_API:BASE_URL +"/reach/contact",
}