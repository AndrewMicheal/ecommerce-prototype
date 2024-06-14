import React from 'react'
import amazonPay from "../../assets/images/amazon-pay.png";
import americanExpress from "../../assets/images/American-Express-Color.png";
import masterCard from "../../assets/images/mastercard.webp";
import payPal from "../../assets/images/paypal.png";
import googlePlay from "../../assets/images/get-google-play.png";
import appleStore from "../../assets/images/get-apple-store.png";

export default function Footer() {
  return (
    <>
        <footer className = "bg-slate-100 py-4 absolute left-0 right-0 bottom-0">
            <div className="container">
                <h2 className = "text-2xl font-semibold">Get the FreshCart App</h2>
                <p className = "my-3">We will send you a link, openit on your phone tp download the app</p>
                <div className = "flex gap-4">
                    <input type="text" className = "form-control flex-grow" placeholder = "Email..." />
                    <button className = "btn-primary">Share App Link</button>
                </div>
                <div className = "flex justify-between items-center mt-4">
                    <div className = "flex gap-2 items-center">
                        <span>Payment Partners</span>
                       <div className = "flex gap-2 items-center">
                        <img className = "w-10" src={amazonPay} alt="amazon" />
                        <img className = "w-10" src={americanExpress} alt="american-express" />
                        <img className = "w-10" src={masterCard} alt="master-card" />
                        <img className = "w-10" src={payPal} alt="paypal" />
                       </div>
                    </div>
                    <div className = "flex gap-2 items-center">
                        <span>Get deliveries with FreshCart</span>
                       <div className = "flex gap-2 items-center">
                        <img className = "w-10" src={googlePlay} alt="google-play" />
                        <img className = "w-10" src={appleStore} alt="apple-store" />
                       </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}
