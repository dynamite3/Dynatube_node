import express, { response } from "express"

const router=express.Router();
import { createConnection } from "../index.js"


router.post("/subscribeTo",async(req,res) =>{
    const from=req.body.subscribeFrom
    const to=req.body.subscribeTo
    
    const result = await addsubscriber(from,to)
    res.send(result)
})


async function addsubscriber(from,to){
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("Subcriber")
        .insertOne({subscribeFrom:from,subscribeTo:to})
    return result;
}

router.post("/unsubscribeTo",async(req,res) =>{
    const from=req.body.subscribeFrom
    const to=req.body.subscribeTo
    const data=req.body;
    const result = await remsubscriber(from,to)
    res.send(result)
})


async function remsubscriber(from,to){
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("Subcriber")
        .deleteOne({subscribeFrom:from,subscribeTo:to})
    return result;
}

router.post("/subscriberNumber",async(req,res) =>{

    const from=req.body.subscribeFrom
    const to=req.body.subscribeTo
    const data=req.body;
    const result = await findSubScribers(from,to)
    res.send(result)
})

 async function findSubScribers(from,to){
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("Subcriber")
        .find({subscribeTo:to})
        .toArray()
    return result;
 }
 router.post("/checksubscribeTo-from",async(req,res) =>{

    const from=req.body.subscribeFrom
    const to=req.body.subscribeTo
    const data=req.body;
    const result = await checkSubScribers(from,to)
    res.send(result)
})

async function checkSubScribers(from,to){
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("Subcriber")
        .find({subscribeTo:to,subscribeFrom:from})
        .toArray()
    return result;
 }



export{router}