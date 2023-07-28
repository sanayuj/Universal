import { userInstance } from "../axios/axiosInstance";

export const userSignup = (values) => {
  console.log(values, "userAPi route!!");
  return userInstance.post("/signup", { ...values }, { withCredentials: true });
};

export const verifyOtp = (otp) => {
  return userInstance.post("/otp", { otp: otp }, { withCredentials: true });
};

export const userLogin = (values) => {
  return userInstance.post("/login", { ...values }, { withCredentials: true });
};

export const Forgotpassword = (phoneNumber) => {
  return userInstance.post("/forgotpassword", phoneNumber, {
    withCredentials: true,
  });
};

export const Forgototp = (otp) => {
  return userInstance.post(
    "/forgototp",
    { otp: otp },
    { withCredentials: true }
  );
};

export const uploadPassword = (values) => {
  return userInstance.post(
    "/editPassword",
    { ...values },
    { withCredentials: true }
  );
};

export const reSendOTP = () => {
  return userInstance.post("/resendotp", { withCredentials: true });
};

export const getAllCourse = () => {
  return userInstance.get("/course");
};
export const getUserDetailsById = (userId) => {
  return userInstance.get(`/getUserProfile/${userId}`);
};

export const userHeader = () => {
  return userInstance.get("/");
};

export const profileChangePassword = (values, userId) => {
  return userInstance.post(`/profileChangePassword/${userId}`, { values });
};

export const updateProfile = (values, Image) => {
  console.log(values,Image,"12345$$$$$")
  return userInstance.post(
    "/userProfileSubmit",
    { ...values },
     { headers: { "Content-Type": "multipart/form-data" } }
  );
};

export const getCourseById = (courseId) => {
  console.log(courseId, "Api called!!");
  return userInstance.get(`/getCourseById/${courseId}`);
};

export const buySingleCourse = (courseId) => {
  return userInstance.post(`/buyCourse/${courseId}`);
};

export const buyCourseInCheckOut = (courseId) => {
  return userInstance.post(`/buyCourseFromCheckout/${courseId}`);
};

export const verifyApi = (response, courseId, amount, bookingData) => {
  return userInstance.post("/verifyApi", {
    ...response,
    courseId,
    amount,
    bookingData,
  });
};

export const getOrderDetails = (courseId, orderId) => {
  console.log("Api Called!!!", courseId, orderId);
  return userInstance.get(`/getOrderDetails/${courseId}/${orderId}`);
};

export const userCourse = () => {
  return userInstance.get("/getUserCourse");
};

export const courseFeedback = (courseId, values) => {
  return userInstance.post(`/userFeedback/${courseId}`, { values });
};

export const search = (query,limit,currectPage) => {
  console.log(query, "Query!!!!");
  return userInstance.get(`/search?q=${query}`, {
    params: { limit, currectPage },
  });
};

export const getCategory = () => {
  return userInstance.get("/getCategoryForFilter");
};

export const getCourseByCategoryId = (categoryId, limit, currectPage) => {
  console.log(categoryId, limit, currectPage, "****+>");
  return userInstance.get(`/getCourseByCategory/${categoryId}`, {
    params: { limit, currectPage },
  });
};
