import react from 'react'
import {FaArrowRight} from 'react-icons/fa'
import {Link} from "react-router-dom"
const Home=()=>{
    return(
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
            {/* section-1 */}
            <div>
                <Link to={"/signUp"}>
                    <div>
                        <div>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Home