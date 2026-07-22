import {useEffect,useState} from 'react'
import {useSelector} from "react-redux"

export default function RequirementField({
    name,label,register,setValue,errors,getValues
}){
    const {editCourse, course} = useSelector((state)=>state.course);
    const [requirement,setRequirement] = useState("");
    const [requirementList,setRequirementList] = useState([]);

    useEffect(()=>{
        if(editCourse){
            setRequirementList(course?.instructions);
        }
        register(name,{required:true,validate:()=>getValues.length>0})
    },[]);

    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList]);

    const handleAddRequirement =()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }
    const handleRemoveRequirement=(index)=>{
        const updatedRequirements = [...requirementList];
        updatedRequirements.splice(index, 1)
        setRequirementsList(updatedRequirements)
    }

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>>
                {label} <sup>*</sup>
            </label>
            <div className="flex flex-col items-start space-y-2">
                <input 
                type="text" 
                id={name}
                value={requirement}
                onClick={(e)=>setRequirement(e.target.value)}
                className='form-style w-full'
                />
                <button
                type="button"
                className='font-semibold text-yellow-50'
                onClick={handleAddRequirement}
                >
                    Add
                </button>
            </div>
            {requirementList.length>0 &&(
                <ul className="mt-2 list-inside list-dis">
                    {requirementList.map((requirement,index)=>(
                        <li key={index} className="flex items-center text-richblack-5">
                            <span>
                                {requirement}
                            </span>
                            <button
                            type='button' className="ml-2 text-xs text-pure-greys-300"
                            onClick={()=>handleRemoveRequirement(index)}
                            >
                                Clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] &&(
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} Is Required
                </span>
            )}
        </div>
    )
}