const userModel=require("../Model/userModel")
//function for user block
module.exports.disableUser=async(req,res,next)=>{
const id=req.body.id
console.log(id)
    try{
        
        let User = await userModel.findById(id);

        User.blockStatus = !User.blockStatus;
    await User.save();
    if(User.blockStatus){
        res.json({message:"User temporary blocked successfully",status:User.blockStatus})
    }else{
        res.json({message:"User unblock successfully",status:User.blockStatus})
    }
    }catch(error){
        res.json({message:"Internal Server Error in Disable",status:false})
    }
}