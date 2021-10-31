import express, { response } from "express"

import { auth } from "../middleware/auth.js";
import { createConnection } from "../index.js";
import { ObjectId } from "bson";
const router=express.Router();



router.get("/",auth,async(request,response)=>{
    response.send("Protected content")
})


router.get("/DetailVideo/:vid",async(request,response)=>{
    const {vid} = request.params
    

    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("videos")
        .findOne({_id:ObjectId(vid)})
    response.send(result)

})



export{router}