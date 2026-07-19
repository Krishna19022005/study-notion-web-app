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
export const contactUsEndpoint = {
  CONTACT_US_API:BASE_URL +"/reach/contact",
}   
//settings Endpoint

export const settingsEndpoints ={
  UPDATE_DISPLAY_PICTURE_API:BASE_URL+"/profile/updateDisplayPicture",
  UPDATE_PROFILE_API:BASE_URL+"/profile/updateProfile",
  CHANGE_PASSWORD_API:BASE_URL+"/auth/changePassword",
  DELETE_PROFILE_API:BASE_URL+"/profile/deleteProfile",
}

//profile Endpoints

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/enrolledCourses",
}