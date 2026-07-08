import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from './HighilightText'
import CTAButton from './Button'
import InstructorImage from '../../../assets/Images/Instructor.png'

const InstructorSection = ()=>{
    return(
        <div>
            <div className='flex flex-col lg:flex-row gap-20 items-center'>
                <div className='lg:w-[50%]'>
                    <img className='shadow-white shadow-[-20px_-20px_0_0]'
                     src={InstructorImage} 
                    />
                </div>
                <div className='lg:w-[50%] flex gap-8 flex-col'>
                    <h1 className='lg:w-[50%] text-4xl font-semibold'>
                        Become and <br />
                        <HighlightText text={" Instructor"}/>
                    </h1>
                    <p className='font-medium text-[-16px] text-justify w-[90%] text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love
                    </p>
                    <div className='w-fit'>
                        <CTAButton active={true} linkto={"/signUp"}>
                            <div className='flex items-center gap-3'>
                                Start Teaching Today
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InstructorSection