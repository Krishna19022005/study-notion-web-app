import { useEffect } from "react"

//This hook detects clicks outside of the specified component and calls the provided handler function.
export default function useOnClickOutside(ref,handler){
    useEffect(()=>{
        //define the listner function to be called on click events
        const listner = (event)=>{
            //if click touch event originated the ref element do nothing
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            //else call the rovided handle function
            handler(event);
        };
        //add event listners
        document.addEventListener("mousedown",listner);
        document.addEventListener("touchstart",listner);

        return () => {
            document.removeEventListener("mousedown", listner);
            document.removeEventListener("touchstart", listner);
        };
    },[ref,handler]);
}