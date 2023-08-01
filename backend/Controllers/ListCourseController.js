const courseModel= require("../Model/CourseModel")
module.exports.getAllCourse=async(req,res,next)=>{
    try{
        let courses=await courseModel.find({})
        if(courses){
        res.json({courses,status:true,message:"Course Found successfully"})
        }else{
            res.json({message:"No courses Found",status:false})
        }
    }catch(error){
        res.json({message:"Internal server error"})
    }
}