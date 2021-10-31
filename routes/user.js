import { ObjectId } from "bson";
import express, { response } from "express"

const router=express.Router();
import { createConnection } from "../index.js"



router.post("/currentUser",async(req,res) =>{
    const {userChannelId}=req.body;
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("logUsers")
        .findOne({_id:ObjectId(userChannelId)})
       
    res.send(result)

    
})

export{router}