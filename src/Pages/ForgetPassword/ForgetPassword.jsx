import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router';
import * as Yup from "yup";
import { baseUrl } from '../../BaseUrl/BaseUrl.js';

export default function ForgetPassword() {
    const navigate = useNavigate();
   
    async function sendData(values) {
       try {
            const {data} = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords` , values);
                if(data.statusMsg == "success") {
                    navigate("/auth/verfiycode")
                }
            
       } catch (error) {
       }
    }


    const validationSchema = Yup.object({
        email : Yup.string().required("email is required").email("email is valid") ,
    })

    const formik = useFormik({
        initialValues: {
            email:"",
        } ,
        validationSchema ,
        onSubmit: sendData
    })
  return (
    <>
        <section>
            <h2 className = "text-2xl text-primary font-bold mb-5">
                <i className = "fa-regular fa-circle-user me-3"></i>
                <span>Forget Password</span>
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
                <button type = "submit" className = "btn-primary">Send</button>
            </form>
        </section>
    </>
  )
}
