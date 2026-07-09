import React,{ useState, useEffect } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {IoIosArrowDown} from "react-icons/io"
import ProfileDropDown from "../core/Auth/ProfileDropDown"

const Navbar = ()=>{

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const [subLinks,setSubLinks] = useState([]);

    const fetchSubLinks = async ()=>{
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            setSubLinks(result.data.allCategories);
             console.log("API Response:", result);
             console.log("result.data =", result.data);
            console.log("result.data.data =", result.data.data);
        }
        catch(err){
            console.log("Could not fetch the categories list ",err)
        }
    }
    useEffect(()=>{
        fetchSubLinks();
    },[])

    const location = useLocation();
    const matchRoute =(route)=>{
        return matchPath({path:route},location.pathname);
    }
    return (
        <div className='flex h-14 border-b-[1px] border-b-richblack-600 items-center justify-center'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to="/">
                    <img width="160" height="42" src={logo} />
                </Link>
                {/* Nav-Links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link,index)=>(
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ?(
                                            <div className='group relative flex cursor-pointer items-center gap-1 text-richblack-25'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDown />
                                                <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px]
                                                    translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0
                                                    transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] 
                                                    group-hover:opacity-100 lg:w-[300px]
                                                '>
                                                    <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5 '>
                                                    </div>
                                                    {
                                                        subLinks.length?(
                                                            subLinks.map((subLink,index)=>(
                                                                <Link to={`/catalog/${subLink.name}`} key={index}>
                                                                    <p className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>
                                                                        {subLink.name}
                                                                    </p>
                                                                </Link>
                                                            ))
                                                        ):(<div></div>)
                                                    }
                                                </div>
                                            </div>
                                        ):(
                                            <Link to={link.path}>
                                                <p className={`${matchRoute(link.path)?"text-yellow-25":"text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>  
                {/* login signup dashboard */}
                <div className='hidden items-center gap-x-4 md:flex'>
                    {
                        user && user?.accountType!=="Instructor"&&(
                            <Link to={"/dashboard/cart"} className='relative'>
                                <AiOutlineShoppingCart className='text-2xl text-richblack-100'/>
                                {
                                    totalItems>0 &&(
                                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-richblack-900">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token==null &&(
                            <Link to={"/signUp"}>
                                <button className="rounded-md border border-yellow-50 bg-yellow-50 px-5 py-2 font-medium text-richblack-900 transition-all duration-300 hover:bg-yellow-25">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token==null &&(
                            <Link to={"/login"}>
                                <button className="rounded-md border border-richblack-600 px-5 py-2 text-richblack-25 transition-all duration-300 hover:border-yellow-50 hover:text-yellow-50">
                                   Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar