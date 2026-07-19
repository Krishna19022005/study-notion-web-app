import { createSlice } from "@reduxjs/toolkit"
import {toast} from 'react-hot-toast'

const initialState = {
    totalItems:localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0,
    total:localStorage.getItem("total")
        ?JSON.parse(localStorage.getItem("total"))
        :0, 
    cart:localStorage.getItem("cart")
        ?JSON.parse(localStorage.getItem("cart"))
        :[], 
};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        //add to cart
        addToCart:(state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item)=>item._id===course._id)

            if(index>=0){
                //the course is already in cart
                toast.error("Course Already in Cart");
                return;
            }
            //add course in cart
            state.cart.push(course);
            state.totalItems++;
            state.total+=course.price;

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            toast.success("Course Added to cart");
        },
        //remove from cart
        removeFromCart:(state,action)=>{
            const courseId = action.payload;
            const index = state.cart.findIndex((item)=>item._id === courseId);

            if(index>=0){
                //the course is found in cart remove it
                state.totalItems--;
                state.total-=state.cart[index].price;
                state.cart.splice(index,1);

                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

                toast.success("Course Removed From cart");
            }
        },
        //reset cart
        resetCart:(state)=>{
            state.cart=[]
            state.total=0
            state.totalItems =0

            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    },
})

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;