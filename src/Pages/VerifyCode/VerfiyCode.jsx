import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router';
import { baseUrl } from '../../BaseUrl/BaseUrl.js';
import * as Yup from "yup";
import { useFormik } from 'formik'

export default function VerfiyCode() {
    const navigate = useNavigate();
   
    async function sendData(values) {
       try {
            const {data} = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode` , values);
            if(data.status === "Success") {
                navigate("/auth/resetPassword")
            }
       } catch (error) {
       }
    }

    const validationSchema = Yup.object({
        resetCode : Yup.string().required("resetCode is required").matches(/^\d+$/ , "resetCode not valid"),
    })

    const formik = useFormik({
        initialValues: {
            resetCode : ""
        } ,
        validationSchema ,
        onSubmit: sendData
    })

  return (
    <>
        <section>
            <h2 className = "text-2xl text-primary font-bold mb-5">
                <i className = "fa-regular fa-circle-user me-3"></i>
                <span>Verfiy Code</span>
            </h2>
            <form className = "space-y-3" onSubmit = {formik.handleSubmit}>
              
            <div>
                    <input 
                    type="text" 
                    className = "w-full form-control" 
                    placeholder = "Reset code" 
                    name = "resetCode"
                    value = {formik.values.resetCode}
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}

                    />
                    {formik.errors.resetCode && formik.touched.resetCode ? <p className = "text-red-600 font-semibold mt-2">* {formik.errors.resetCode}</p> : ""}
                </div>
                <button type = "submit" className = "btn-primary">Send</button>
            </form>
        </section>
    </>
  )
}
