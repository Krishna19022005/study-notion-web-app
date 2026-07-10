import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function SignUp(){
    return (
        <Template
            title="Join the millions learning to code with StudyNotion for free"
            desc1="Build skills for Today, Tomorrow and Beyond"
            desc2="Education for Future-Proof your Career."
            image={signupImg}
            formType="signUp"
        />
    )
}

export default SignUp