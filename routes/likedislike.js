import express, { response } from "express"

const router=express.Router();
import { createConnection } from "../index.js"


router.post("/getstat",async(req,res)=>{
    const {videoId}=req.body
    console.log(videoId)

    const client = await createConnection();
    const result2= await client
        .db("Dynatubelogin")
        .collection("likedislike")
        .find({videoId})
        .toArray()
    res.send(result2)

})

router.post("/likeaction",async(req,res)=>{
    const {videoId,actionby}=req.body
    const client = await createConnection();
    const result2= await client
        .db("Dynatubelogin")
        .collection("likedislike")
        .insertOne({videoId,actionby})
    res.send(result2)

})

router.post("/unlikeaction",async(req,res)=>{
    const {videoId,actionby}=req.body
    const client = await createConnection();
    const result2= await client
        .db("Dynatubelogin")
        .collection("likedislike")
        .deleteOne({videoId:videoId,actionby:actionby})
    res.send(result2)

})

export{router}