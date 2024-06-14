import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import * as Yup from "yup";
import { baseUrl } from '../../BaseUrl/BaseUrl.js';
import { userContext } from '../../Context/user.context.jsx';

export default function ResetPassword() {
    const navigate = useNavigate();

    const {token , setToken} = useContext(userContext);

    async function Reset(values) {
        let loadingId;
       try {
        loadingId = toast.loading("Waiting...")
        const {data} = await axios.put(`${baseUrl}/api/v1/auth/resetPassword` , values);
        toast.dismiss(loadingId)
        toast.success("Success");
        setToken(data.token)
        localStorage.setItem("token" , data.token);
        navigate("/")
       } catch (error) {
            toast.dismiss(loadingId)
           toast.error(error.response.data.message)
       }
    }


    const validationSchema = Yup.object({
        email : Yup.string().required("email is required").email("email is valid") ,
        newPassword : Yup.string().required("password is required").matches(/^[A-Z][0-9a-zA-Z]{5,25}$/ , "password should start with uppercase letter followed by a combinations of letters and numbers from 5 to 25"),
    })

    const formik = useFormik({
        initialValues: {
            email:"",
            newPassword:""
        } ,
        validationSchema ,
        onSubmit: Reset
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
               
                <div>
                    <input 
                    type="password" 
                    className = "w-full form-control" 
                    placeholder = "Password" 
                    name = "newPassword"
                    value = {formik.values.newPassword}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}

                    />
                    {formik.errors.newPassword && formik.touched.newPassword ? <p className = "text-red-600 font-semibold mt-2">* {formik.errors.newPassword}</p> : ""}

                </div>
                <button type = "submit" className = "btn-primary mr-4">Reset in</button>
            </form>
        </section>
    </>
  )
}
