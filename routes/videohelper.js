import { ObjectId } from "bson";
import { createConnection } from "../index.js";


export async function addvideo(data){
    console.log(data)
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("videos")
        .insertOne(data);
    return result;
}


export async function getallvideos(){
    const client = await createConnection();
    const result =  await client
        .db("Dynatubelogin")
        .collection("videos")
        .find({})
        .toArray();
    return result;
}