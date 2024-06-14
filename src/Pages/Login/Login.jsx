import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import * as Yup from "yup";
import { baseUrl } from '../../BaseUrl/BaseUrl.js';
import { userContext } from '../../Context/user.context.jsx';

export default function Login() {
    const navigate = useNavigate();
    const [type , setType] = useState("password");
    const [hidden , setHidden] = useState("hidden");
    const {token , setToken} = useContext(userContext);

    function goToForgetPasswordPage() {
        navigate("/auth/forgetpassword");
    }

    async function sendDataToHome(values) {
        let loadingId;
       try {
            loadingId = toast.loading("Waiting...")
            const {data} = await axios.post(`${baseUrl}/api/v1/auth/signin` , values);
            toast.dismiss(loadingId)
            toast.success("User Loggedin Successfully");
            setTimeout(() => {
                if(data.message === "success") {
                    setToken(data.token)
                    localStorage.setItem("token" , data.token);
                    navigate("/")
                }
            } , 3000)
       } catch (error) {
        //    setErrMsg(error.response.data.message);
            toast.dismiss(loadingId)
           toast.error(error.response.data.message)
       }
    }


    const validationSchema = Yup.object({
        email : Yup.string().required("email is required").email("email is valid") ,
        password : Yup.string().required("password is required").matches(/^[A-Z][0-9a-zA-Z]{5,25}$/ , "password should start with uppercase letter followed by a combinations of letters and numbers from 5 to 25"),
    })

    const formik = useFormik({
        initialValues: {
            email:"",
            password:""
        } ,
        validationSchema ,
        onSubmit: sendDataToHome
    })
  return (
    <>
        <section>
            <h2 className = "text-2xl text-primary font-bold mb-5">
                <i className = "fa-regular fa-circle-user me-3"></i>
                <span>Login Now</span>
            </h2>
            <form className = "space-y-3" onSubmit = {formik.handleSubmit}>
              
                <div>
                    <input 
                    type="email" 
                    className = "w-full form-control" 
                    placeholder = "Email" 
                    name = "email"
                    value = {formik.values.email}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}

                    />
                    {formik.errors.email && formik.touched.email ? <p className = "text-red-600 font-semibold mt-2">* {formik.errors.email}</p> : ""}

                </div>
               
                <div className = "relative">
                    <input 
                    type={type} 
                    className = "w-full form-control" 
                    placeholder = "Password" 
                    name = "password"
                    value = {formik.values.password}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}
                    />
                    <div className = "absolute top-1 right-4">
                        <i onClick = {()=> {
                            setType("text");
                            setHidden("");
                        }} className={hidden !== "hidden" ? "fa-regular fa-eye text-xl cursor-pointer hidden" : "fa-regular fa-eye text-xl  cursor-pointer"}></i>
                        <i  onClick = {()=> {
                            setType("password");
                            setHidden("hidden");
                        }}  className={hidden == "hidden" ? "fa-solid fa-eye-slash hidden text-xl cursor-pointer" : "fa-solid fa-eye-slash text-xl cursor-pointer"}></i>
                    </div>
                    {formik.errors.password && formik.touched.password ? <p className = "text-red-600 font-semibold mt-2">* {formik.errors.password}</p> : ""}

                </div>
                <button type = "submit" className = "btn-primary mr-4">Sign in</button>
                <button onClick = {goToForgetPasswordPage} className = "btn-primary bg-red-500">Forget Password</button>
            </form>
        </section>
    </>
  )
}
