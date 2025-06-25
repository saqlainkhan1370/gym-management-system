
const Gym  = require('../Modals/gym')
const bcrypt = require('bcryptjs');
const { error } = require('console');
const crypto =require('crypto');
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")


exports.register =async(req,res)=>{
    try{
        const{ userName ,  gymName,password ,  profilePic, email}= req.body;

        const isExist = await Gym.findOne({userName});
        if(isExist){
            res.status(400).json({
                error:"Username Already Exist , Please try with other username"
            })
        } else{
            const hashedPassword = await bcrypt.hash(password,10)
            console.log(hashedPassword)
            const newGym = new Gym({userName ,password : hashedPassword ,  gymName,  profilePic, email});
            await newGym.save();

         res.status(201).json({ message:"User registered successfully", success:"yes",data:newGym});

        }

    }catch(err){
        res.status(500).json({
            error:"server Error"
        })
    }
}





     const cookieOption ={
        httpOnly:true,
        secure : false,
        sameSite : 'Lax'
     }





exports.login = async(req,res)=>{
    try{

        const{userName , password}=req.body;
        const gym = await Gym.findOne({userName,});
        if(gym && await bcrypt.compare(password,gym.password)){

        const token = jwt.sign({gym_id:gym._id},process.env.JWT_SecretKey);
        
        res.cookie("cookie_token",token,cookieOption)
        

            res.json({
                message:'logged in successfully',success:"true",gym,token
            });
        } else{

         res.status(400).json({ error:'Invalid credentials'});

        }


        

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"server Error"
        })
    }
    
}

   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.SENDER_EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
   });



  
exports.sendOtp =async(req,res)=>{
    try{

       const{email}= req.body;
       const gym =await Gym.findOne({email});
            if(gym){

                const buffer = crypto.randomBytes(4);  // generate random bytes
                const token = buffer.readInt32BE(0) % 900000 + 100000;     //module to get 6 digit number
                gym.resetPasswordToken = token;
                gym.resetPasswordExpires =Date.now()  + 3600000               // add time such as +1 hrs


                await gym.save();
         
                // for mail sending

                const mailOption ={
                  from: process.env.SENDER_EMAIL,

                    to: email,
                    subject: 'Password Reset',
                    text: `You requested a password reset. Your OTP is: ${token}`

                };

                transporter.sendMail(mailOption,(error , info)  =>{
                    if(error){
                        res.status(500).json({error:'server error',errorMsg:error });
                    }else{
                        res.status(200).json({message:"OTP sent to your email"})
                    }
                }
                );



             }else{
                 return res.status(400).json({error:"Gym not found"});
      }

    }catch(err){
        res.status(500).json({
            error:"server Error"
        })
    }
}
exports.checkOtp = async(req,res)=>{
    try{

        const{email,otp} = req.body;
        const gym = await Gym.findOne(
            {
                email,
                resetPasswordToken:otp,
                resetPasswordExpires:{   $gt:Date.now()}
            });
            if(!gym){
                return res.status(400).json({ error:'Otp is invalid or has expired'});
            }
            res.status(200).json({ message:"Otp is Successfully Verified"})
        

    }catch(err){
        res.status(500).json({
            error:"server Error"
        })
    }
}


exports.resetPassword = async (req,res)=>{
    try{
        const {email,newPassword} =req.body;
        const gym = await Gym.findOne({email});
        if(!gym){
            return res.status(400).json({ error:'Some technical issue, Please try again later'});
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        gym.password = hashedPassword;
        gym.resetPasswordToken = undefined;
        gym.resetPasswordExpires = undefined;


        await gym.save();
        res.status(200).json({ message:"Password Reset Successfully"})


    }catch(err){
        res.status(500).json({
            error:"server Error"
        })
    }
}

exports.logout = async(req,res)=>{
    res.clearCookie('cookie_token',cookieOptions).json({message:'Logged out successfully'});

}
