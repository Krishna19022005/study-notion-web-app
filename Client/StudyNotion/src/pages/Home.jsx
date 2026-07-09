import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighilightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/Common/Footer'

const Home=()=>{
    return(
        <div >
            {/* section-1 */}
            <div className="relative mx-auto flex w-9/12 max-w-maxContent flex-col items-center justify-between gap-4 mb-28 text-white"> 
                <Link to={"/signUp"}>
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:shadow-none">
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-1 group-hover:bg-richblack-800'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>
                <div className='text-center text-4xl font-semibold mt-4'>
                    Empower your Future with 
                    <HighlightText text={" Coding Skills"}/>
                </div>
                <div className='w-[80%]  text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>
                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active ={true} linkto ={"signUp"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"login"}>
                        Book a Demo
                    </CTAButton>
                </div>
                <div className='w-[900px] mt-4 shadow-blue-200 '>
                    <video muted loop autoPlay playsInline className="w-full rounded-lg h-[550px] ">
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>
                {/* code section-1 */}
                <div>
                    <CodeBlocks
                         position="lg:flex-row"
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={" coding potential "}/>
                                with our online courses
                            </div>
                        }
                        subHeading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText:"Try it Yourself",
                                linkto:"/signUp",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`
                        }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={"codeblock1"}
                    />
                </div>
                {/* code section-2 */}
                <div>
                    <CodeBlocks
                        position="lg:flex-row-reverse"
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighlightText text={" coding in seconds. "}/>
                            </div>
                        }
                        subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText:"Continue Lesson",
                                linkto:"/signUp",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
                        }
                        codeColor={"text-white"}
                        backgroundGradient={"codeblock2"}
                    />
                </div>
                <ExploreMore />
            </div>

            {/* Section-2 */}
            <div className='bg-richblue-25 text-richblack-700'>
                <div className='mx-auto  flex w-9/12 max-w-maxContent flex-col items-center justify-between gap-8'>
                    <div className='mb-10 mt-[300px] flex flex-col justify-between gap-7 lg:flex-row  lg:gap-0'>
                        <div className='text-4xl font-semibold lg:w-[45%]'>
                            Get the skills you needed for a
                            <HighlightText text={" job that is in demand."}/>
                        </div>
                        <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                            <div className='text-[16px] text-richblack-600'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        </div>
                    </div>
                    <TimelineSection/>
                     <LearningLanguageSection/>
                </div>
                
               
            </div>

            {/* section-3 */}
            <div className='relative mx-auto my-20 flex w-9/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                <InstructorSection/>
            </div>
            <Footer/>
        </div>
    )
}

export default Home