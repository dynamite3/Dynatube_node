import express, { response } from "express"

import { auth } from "../middleware/auth.js";
import { createConnection } from "../index.js";
import { ObjectId } from "bson";

const router=express.Router();


router.post("/getAllComments",async(req,res)=>{
    const {videoId}=req.body

    const client = await createConnection();
    const result2= await client
        .db("Dynatubelogin")
        .collection("comments")
        .find({postId:videoId})
        .toArray()

    res.send(result2)

})


router.post("/uploadComment", async (request, response) => {
    const  {content,writer,postId,responseTo}=request.body
    console.log(content)
    console.log(writer)
    console.log(postId)



    const client = await createConnection();
    const result1 = await client
        .db("Dynatubelogin")
        .collection("logUsers")
        .findOne({_id:ObjectId(writer)})

    const result2= await client
    .db("Dynatubelogin")
    .collection("comments")
    .insertOne({
        content,
        writer:result1,
        postId:postId,
        responseTo:responseTo
    })

    response.send(result2)
    
})

export{router}