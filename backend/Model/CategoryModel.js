const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

module.exports=new mongoose.model("Category",categorySchema)