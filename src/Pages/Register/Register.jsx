import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import * as Yup from "yup";
import { baseUrl } from '../../BaseUrl/BaseUrl.js';
import { useState } from 'react';

export default function Register() {
    const navigate = useNavigate();
    const [type , setType] = useState("password");
    const [hidden , setHidden] = useState("hidden");

    const [rePasswordType , setRePasswordType] = useState("password");
    const [rePassowrdHidden , setRePassowrdHidden] = useState("hidden");

    async function sendDataToRegister(values) {
        let loadingId;
       try {
            loadingId = toast.loading("Waiting...")
            const {data} = await axios.post(`${baseUrl}/api/v1/auth/signup` , values);
            toast.dismiss(loadingId)
            toast.success("User Created Successfully");
            setTimeout(() => {
                if(data.message === "success") {
                    navigate("/auth/login")
                }
            } , 3000)
       } catch (error) {
        //    setErrMsg(error.response.data.message);
            toast.dismiss(loadingId)
           toast.error(error.response.data.message)
       }
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    const validationSchema = Yup.object({
        name : Yup.string().required("name is required").min(3 , "name must be at least 3 characters").max(50 , "name must be at most 15 characters") ,
        email : Yup.string().required("email is required").email("email is valid") ,
        phone : Yup.string().required("phone is required").matches(phoneRegex , "phone number is not valid") ,
        password : Yup.string().required("password is required").matches(/^[A-Z][0-9a-zA-Z]{5,25}$/ , "password should start with uppercase letter followed by a combinations of letters and numbers from 5 to 25"),
        rePassword : Yup.string().required("re-password is required").oneOf([Yup.ref("password")] , "password and re-password should be the same")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        } ,
        validationSchema ,
        onSubmit: sendDataToRegister
    })
  return (
    <>
        <section>
            <h2 className = "text-2xl text-primary font-bold mb-5">
                <i className = "fa-regular fa-circle-user me-3"></i>
                <span>Register Now</span>
            </h2>
            <form className = "space-y-3" onSubmit = {formik.handleSubmit}>
                <div>
                    <input 
                    type="text" 
                    className = "w-full form-control" 
                    placeholder = "username" 
                    name = "name"
                    value = {formik.values.name}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}

                    />
                    {formik.errors.name && formik.touched.name ? <p className = "text-red-600 font-semibold mt-2">* {formik.errors.name}</p> : ""}
                </div>
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
                <div>
                    <input 
                    type="tel" 
                    className = "w-full form-control" 
                    placeholder = "Phone" 
                    name = "phone"
                    value = {formik.values.phone}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}


                    />
                    {formik.errors.phone && formik.touched.phone ? <p className = "text-red-600 font-semibold mt-2">* {formik.errors.phone}</p> : ""}

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
                <div className = "relative">
                    <input 
                    type={rePasswordType}
                    className = "w-full form-control" 
                    placeholder = "Re-password" 
                    name = "rePassword"
                    value = {formik.values.rePassword}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}

                    />
                    <div className = "absolute top-1 right-4">
                        <i onClick = {()=> {
                            setRePasswordType("text");
                            setRePassowrdHidden("");
                        }} className={rePassowrdHidden !== "hidden" ? "fa-regular fa-eye text-xl cursor-pointer hidden" : "fa-regular fa-eye text-xl  cursor-pointer"}></i>
                        <i  onClick = {()=> {
                            setRePasswordType("password");
                            setRePassowrdHidden("hidden");
                        }}  className={rePassowrdHidden == "hidden" ? "fa-solid fa-eye-slash hidden text-xl cursor-pointer" : "fa-solid fa-eye-slash text-xl cursor-pointer"}></i>
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword ? <p className = "text-red-600 font-semibold mt-2">* {formik.errors.rePassword}</p> : ""}

                </div>
                <button type = "submit" className = "btn-primary">Sign Up</button>
            </form>
        </section>
    </>
  )
}
