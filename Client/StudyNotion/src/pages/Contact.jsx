import React from 'react'

import Footer from "../components/Common/Footer"
import ContactForm from '../components/contactPage/ContactForm'
import ContactDetails from '../components/contactPage/ContactDetails'


const Contact = ()=>{
    return (
        <div>
            <div className='mx-auto mt-20 flex max-w-9/12 w-full mb-12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row'>
                {/* Contact-Details */}
                <div className='lg:w-[40%]'>
                    <ContactDetails/>
                </div>

                {/* Contact-Form */}
                <div className='lg:w-[50%]'>
                    <ContactForm/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Contact