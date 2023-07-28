import { adminInstance } from "../axios/axiosInstance";

export const adminLogin = (values) => {
  return adminInstance.post("/login", { ...values });
};

export const addCourse = (values, course, image) => {
  return adminInstance.post(
    "/addCourse",
    { ...values, course, image },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};
export const editCourse=(values,image,courseId)=>{
  console.log(values,image,courseId,"EDITCOURSE VALUES!!!!")
return adminInstance.post(
  `/editCourse/${courseId}`,{...values,image},
  {headers:{ "Content-Type": "multipart/form-data" }}
)
}

export const addCategory=(values)=>{
  console.log(values,"api called!!!!")
  return adminInstance.post("/addCategory",{...values},{ headers: { "Content-Type": "multipart/form-data" } })
}

export const getAllUser=()=>{
  return adminInstance.get("/listuser")
}


export const userDisabled=(id)=>{
  return adminInstance.post("/listuser",{id})
}

export const getAllCourse=()=>{
return adminInstance.get("/getAllCourse")
}

export const deleteCourse = (courseId) => {
  return adminInstance.post(`/deleteCourse/${courseId}`);
};


export const getCourseById=(courseId)=>{
  console.log(courseId,"admin api Called")
  return adminInstance.get(`/courseEdit/${courseId}`)
}

export const AdminDashboard=()=>{

  return adminInstance.get("/adminDashboard")
}

export const BookingHistroyDetails=()=>{

  return adminInstance.get("/bookingDetails")
}

export const singleCourseBookingDetails=(id)=>{
  console.log("api BookingMain",id)
  return adminInstance.get(`/getMainBookingPage/${id}`)
}

export const getCategoryList=()=>{
  return adminInstance.get("/getCategoriesDetails")
}