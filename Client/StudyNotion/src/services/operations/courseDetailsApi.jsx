import {toast} from 'react-hot-toast'
import { updateCompletedLectures } from '../../slice/viewCourseSlice'
import {apiConnector} from '../apiconnector'
import {courseEndpoints} from '../apis'

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETIOIN_API,

} = courseEndpoints;

export const getAllCourses = async()=>{
    const toastId = toast.loading("Loading...");
    let result =[];
    try{
        const response = await apiConnector("GET",GET_ALL_COURSE_API);
        if(!response?.data?.success){
            throw new Error("Could not fetch courses")
        }
        result = response.data.data;
    }catch(error){
        console.log("GET_ALL_COURSES_API_ERROR.......",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseDetails = async (courseId)=>{
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("GET",COURSE_DETAILS_API,{
            courseId,
        })
        console.log("COURSE_DETAILS_API_RESPONSE: ",response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data;
    }catch(error){
        console.log("COURSE_DETAILS_API_ERROR.....",error);
        result = error.message.data;
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);

    return result;
}

//fetch all available course categories

export const fetchCourseCategories = async()=>{
    let result =[]
    try{
        const response = await apiConnector("GET",COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API_RESPONSE: ",response);

        if(!response?.data?.success){
            throw new Error("Could not fetch course Categories");
        }
        result = response.data.data;
    }
    catch(error){
        console.log("Course_category_api_error....",error);
        toast.error(error.message);
    }
    return result;
}

//add Course details
export const addCourseDetails = async(data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    
    try{
        const response = await apiConnector("POST",CREATE_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_COURSE_API_RESPONSE: ",response);
        if(!response.data.success){
            throw new Error("Could not add course details");
        }
        toast.success("Course details added successfully");
        result = response.data.data;
    }
    catch(error){
        console.log("CREATE COURSE API ERROR: ",error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//edit course details
export const editCourseDetails = async(data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("PUT",EDIT_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT COURSE API RESPONSE: ",response);

        if(!response?.data?.data) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully");
        result = response.data.data;
    }
    catch(error){
        console.log("Edit Course Api Error....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//create a section
export const createSection = (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading....");
    try{
        const response = await apiConnector("POST",CREATE_SECTION_API,data,{
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE SECTION API RESPONSE.....",response)
        if(!response.data.success){
            throw new Error("Could not create section")
        }
        toast.success("Course Section Created");
        result = response.data.data;
    }catch(error){
        console.log("CREATE SECTIOIN API ERROR..............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}
//crate subSection
export const createSubSection = async (data,token)=>{
    let result = null
    const toastId = toast.loading("Loading...");
    try{
        const reaponse = await apiConnector("POST",CREATE_SUBSECTION_API,data,{
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE SUB-SECTION API RESPONSE.................", response)

        if(!response.data.success){
            throw new Error("Could not add lecture");
        }
        toast.success("Lecture Added")
        result = response.data.data;
    }
    catch(error){
        console.log("CREATE SUB-SECTION API ERROR.................", error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//update section 

export const updateSection = async(data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST",UPDATE_SECTION_API,data,{
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE SECTION API RESPONSE.................", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = response?.data?.data
    }catch(error) {
        console.log("UPDATE SECTION API ERROR...................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        }) 
        console.log("UPDATE SUB-SECTIOIN API RESPONSE.................", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = response?.data?.data

    } catch(error) {
        console.log("UPDATE SUB-SECTIOIN API ERROR................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//delte a section
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SECTION API RESPONSE................", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = response?.data?.data

    } catch (error) {
        console.log("DELETE SECTION API ERROR.................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//delete a subsection
export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SUB-SECTION API RESPONSE..................", response)

        if(!response?.data?.success) {
            throw new Error("Could Not Delete Lecture")
        }
        toast.success("Lecture Updated")
        result = response?.data?.data

    } catch(error) {
        console.log("DELETE SUB-SECTION API ERROR..................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// delete a course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE COURSE API RESPONSE..............", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Delete Course")
        }
        toast.success("Course Deleted")

    } catch (error) {
        console.log("DELETE COURSE API ERROR...................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}
// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        })

        console.log("INSTRUCTOR COURSES API RESPONSE................", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response?.data?.data

    } catch(error) {
        console.log("INSTRUCTOR COURSES API ERROR................", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//mark a lecture as completed
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("Mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", LECTURE_COMPLETIOIN_API, data, {
            Authorization: `Bearer ${token}`
        })

        console.log(
            "MARK_LECTURE_AS_COMPLETE_API API RESPONSE.................",
            response
        )

        if(!response.data.message) {
            throw new Error(response.data.error)
        }
        toast.success("Lecture Completed")
        result = false
    } catch(error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR...............", error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}
