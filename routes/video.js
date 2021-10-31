import express, { response } from "express"

import { auth } from "../middleware/auth.js";

import ffmpeg from "fluent-ffmpeg"

import multer from "multer";
import { addvideo,getallvideos } from "./videohelper.js";
import { createConnection } from "../index.js";
import { ObjectId } from "bson";

const router=express.Router();


router.post("/uploadVideo",async(req,res) =>{
    const data=req.body;
    const result = await addvideo(data)
    res.send(result)
})

router.get("/uploadVideo",async(req,res) =>{
    const result = await getallvideos()
    res.send(result)
})

router.post("/subscribedVideo",async(req,res) =>{
    const {subscribeFrom}=req.body;
    
    const result1 = await getAllSubscribedTo(subscribeFrom)
    const svresult= await getSubscibedVideos(result1)
    res.send(svresult)
    
})
router.delete("/deletevideo",async(req,res) =>{
    const {idtodelete}=req.body;
    console.log("idtodelete: "+idtodelete)
    const client = await createConnection();
    const result =  await client
        .db("Dynatubelogin")
        .collection("videos")
        .deleteOne({"_id":ObjectId(idtodelete)})
    

    const result1 =  await client
        .db("Dynatubelogin")
        .collection("comments")
        .deleteOne({"postId":idtodelete})

    res.send("success")
    

    
})


router.post("/ChannelVideo",async(req,res) =>{
    console.log("----------")
    const {channelId}=req.body;
    console.log(channelId)
    console.log("----------")
    const client = await createConnection();
    const result =  await client
        .db("Dynatubelogin")
        .collection("videos")
        .find({"writer._id":channelId})
        .toArray();
    res.send(result)

})

async function getAllSubscribedTo(subscribeFrom){
    console.log(subscribeFrom)
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("Subcriber")
        .find({subscribeFrom:subscribeFrom})
        .toArray()
    const result1=result.map((e)=>e.subscribeTo)
    return result1;

}

async function getSubscibedVideos(result1){
    console.log("''''''''''''''")
    console.log(result1)
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("videos")
        .find({"writer._id":{$in:[...result1]}})
        .toArray();
    return result;
    
}


router.post("/upload",(req,res)=>{
    const data=req.body
    console.log(data)

})




   














// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname)
//         if (ext !== '.mp4') {
//             return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
//         }
//         cb(null, true)
//     }
// })

// var upload = multer({ storage: storage }).single("file")


// router.post("/upload",(req,res)=>{
    
//     upload(req, res, err => {
//         if (err) {
//             return res.json({ success: false, err })
//         }
//         return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
//     })

// })


// var storage1 = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/thumbnails/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname)
//         if (ext !== '.mp4') {
//             return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
//         }
//         cb(null, true)
//     }
// })

// var upload1 = multer({ storage: storage1 }).single("file")




// // router.post("/thumbnail",(req,res)=>{
// //     console.log(req.body)
    
// //     let thumbsFilePath ="";
// //     let fileDuration ="";

   
// //     ffmpeg(req.body.filePath)
// //         .on('filenames', function (filenames) {
// //             console.log('Will generate ' + filenames.join(', '))
// //             thumbsFilePath = "uploads/thumbnails/" + filenames[0];
// //         })
// //         .on('end', function () {
// //             console.log('Screenshots taken');
// //             return res.json({ success: true})
// //             // return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
// //         })
// //         .screenshots({
// //             // Will take screens at 20%, 40%, 60% and 80% of the video
// //             count: 3,
// //             folder: 'uploads/thumbnails',
// //             size:'320x240',
// //             // %b input basename ( filename w/o extension )
// //             filename:'thumbnail-%b.png'
// //         });

// // })

// router.post("/thumbnail",(req,res)=>{

// upload1(req, res, err => {
//     if (err) {
//         return res.json({ success: false, err })
//     }
//     return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
// })

// })
export{router}