import { ObjectId } from "bson";
import nodemailer from "nodemailer";
import { createConnection } from "./index.js";
import dotenv from "dotenv";
dotenv.config();

const GMAIL_PASSWORD=process.env.GMAIL_PASSWORD

export async function getallusers() {
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("resetPass")
        .find({})
        .toArray();
    return result;
}

export async function searchbyuser(userEmailId) {
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("logUsers")
        .findOne({EmailId:userEmailId})
    return result;
}


export async function addusers(FirstName, LastName, EmailId, hashedPassword) {
    const client = await createConnection();
    const cratedAt=Date()
    const result = await client
        .db("Dynatubelogin")
        .collection("logUsers")
        .insertOne({ FirstName: FirstName, LastName: LastName,EmailId:EmailId, Password: hashedPassword, cratedAt });
    return result;

}

export async function searchbyuserInReset(EmailId){
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("resetPass")
        .findOne({EmailId:EmailId})
        
    return result;
}


export async function addRandomNumber(EmailId,randomNum){

    const userEx= await searchbyuserInReset(EmailId)
    SendMail(EmailId,randomNum)
    if(!userEx){
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("resetPass")
        .insertOne({ EmailId:EmailId, RandomNum: randomNum });
    return result;
    }
    else{
        const temp=userEx._id
        const client = await createConnection();
        const result = await client
        .db("Dynatubelogin")
        .collection("resetPass")
        .updateOne({_id:temp},{$set:{RandomNum: randomNum}});
        return result;
   }

   
}

async function SendMail(EmailId,randomNum){
    console.log("hiiii ",EmailId, randomNum)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testerAtwork09@gmail.com',
          pass: GMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: 'testerAtwork09@gmail.com',
        to: EmailId,
        subject: 'Password Reset Code',
        text: 'This is your Password reset code : '+randomNum
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


export async function updatePassword(EmailId,hashedPassword){
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("logUsers")
        .updateOne({EmailId:EmailId},{$set:{Password:hashedPassword}})
    await clearResetDB(EmailId)
    return result;
}

async function clearResetDB(EmailId){
    const client = await createConnection();
    const result = await client
        .db("Dynatubelogin")
        .collection("resetPass")
        .deleteOne({EmailId:EmailId})

}