import { ObjectId } from "bson";
import mongoose from "mongoose";

const videoSchema=mongoose.Schema({
    writer:{
        type:ObjectId,
        
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String,
    },
    privacy:{
        type: Number
    },
    filePath:{
        type:String
    },
    thumbnail:{
        type:String
    },
    views:{
        type:Number
    },
    catogery:{
        type:String
    },
    duration:{
        type:String
    }
    

},{
    timestamps:true
})


const Video=mongoose.model("videomodel",videoSchema);
module.exports={Video}