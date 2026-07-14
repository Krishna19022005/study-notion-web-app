const Contact = require("../models/ContactUs")
const mailSender = require("../utils/mailSender");

exports.ContactUs = async (req,res)=>{
    try{
        const {firstName,lastName,email,phoneNo,countryCode,message} = req.body;

        if(!firstName || !lastName || !phoneNo|| !email|| !countryCode || !message){
            return res.status(400).json({
                success:false,
                message:"All Fields are Required",
            });
        }
        const response = await Contact.create({
            firstName,
            lastName,
            email,
            phoneNo,
            countryCode,
            message,
        });
        console.log("Contact us response",response);

        const body = `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phoneNo}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        `;

        try{
            const mailResponse = await mailSender(
                process.env.MAIL_USER,
                "New Contact us Form Submission",
                body,
            )
        }catch(err){
            console.log(err);
            return res.json({
                success:false,
                message:"Unable to send mail"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Message Sent Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong",
        })
    }
}   
