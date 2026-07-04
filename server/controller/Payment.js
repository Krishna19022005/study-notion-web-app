const {instance} = require("../config/razorpay");
const course = require("../models/User");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {default:mongoose} = require("mongoose");

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req,res)=>{
    //get courseId and userId
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
    if(!course_id){
        return res.json({
            success:false,
            message:"Please Provide Valid Course ID",
        });
    }

    //valid CourseDetail
    let course;
    try{
        course = await Course.findById(courseId);
        if(!course){
            return res.json({
                success:false,
                messsage:"Could not Find the course",
            });
        }
        //check if user already paid for the same course
        const uid = new mogoose.Type.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is Already enrolled",
            });
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            messsage:err.message,
        });
    }
    //Order Create
    const amount = course.price;
    const currency = 'INR';

    const options ={
        amount:amount*100,
        currency,
        receipt:Math.randon(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"Could not initiate order",
        });
    }
};

//verify signature of razorpay and server
exports.verifySignature = async (req,res)=>{
    const webhookSecret = '123456';
    const signature = req.headers("x-razorpay-signature");

    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature == digest){
        console.log("PAyment is Authorized");

        const{courseId,userId} = req.body.payload.payment.entity.notes;

        try{
            //fulfill the action

            //find course and enroll in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true},
            );

            if(!enrolledCourse){
                return res.status(404).json({
                    success:false,
                    message:"Course not Found",
                });
            }
            console.log(enrolledCourse);

            //find the student and add coures to enrolled listr\
            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {$psuh:{courses:courseId}},
                {new:true},
            );
            console.log(enrolledStudent);

            //send confirmation mail
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations from StudyNotion",
                "Congratulations, You are onboarded into a new Course",
            );
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:err.message,
            });
        }catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }else{
        return res.status(400).json({
            success: false,
            message: 'Invalid Request',
        });
    }
};

