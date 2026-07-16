import "./App.css";
import {Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import Navbar from "./components/Common/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";

function App(){
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>

        <Route path="/dashboard" element ={<Dashboard/>}>
          <Route path="my-profile" element={<MyProfile/>}/>
          {/* <Route path="setting" element={<Settings/>}/> */}
        </Route>

      </Routes>
      
    </div>
  )
}
export default App