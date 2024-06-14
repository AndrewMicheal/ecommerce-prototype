import React, { useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/images/freshcart-logo.svg";
import { cartContext } from '../../Context/cart.context';
import { userContext } from './../../Context/user.context';

export default function Navbar() {
    const {token , logOut} = useContext(userContext);
    const {getCartInfo , cartInfo} = useContext(cartContext);
    useEffect(() => {
        if(cartInfo?.length !== 0) {
            getCartInfo();
        }
    } , [])
    return (
        <>
            <nav className="p-4 bg-slate-100 w-full fixed left-0 right-0 top-0 z-50">
                <div className="container flex gap-8">
                    <h1>
                        <Link href="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </h1>
                    {token ?  <ul className = "flex gap-6 items-center">
                        <li>
                            <NavLink className = {({isActive}) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink className = {({isActive}) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/categories">Categories</NavLink>
                        </li>
                        <li>
                            <NavLink className = {({isActive}) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/brands">Brands</NavLink>
                        </li>
                        <li>
                            <NavLink className = {({isActive}) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/wishlist">wish list</NavLink>
                        </li>
                        <li>
                            <NavLink className = {({isActive}) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/allorders">Orders</NavLink>
                        </li>
                    </ul> : ""}

                    <Link to = {`/cart`} className = "ms-auto text-lg relative">
                        <i className = "fa-solid fa-cart-shopping"></i>
                        {token && cartInfo?.length !==0 ? <span className = "bg-primary absolute w-6 rounded-full h-6 text-sm font-bold text-white flex justify-center items-center top-0 right-0 translate-x-1/2 -translate-y-1/2">{cartInfo?.numOfCartItems}</span>: ""}
                    </Link>
                    <ul className = "flex gap-6 items-center ">
                        <li>
                            <a href="https://www.facebook.com"> <i className="fa fa-brands fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com"> <i className="fa fa-brands fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com"> <i className="fa fa-brands fa-tiktok"></i></a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com"> <i className="fa fa-brands fa-youtube"></i></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com"> <i className="fa fa-brands fa-instagram"></i></a>
                        </li>
                    </ul>

                    <ul className = "flex gap-6 items-center">
                        {!token ? <>
                            <li>
                            <NavLink className = {({isActive}) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/auth/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink className = {({isActive}) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/auth/signup">Sign up</NavLink>
                        </li>
                        </>  :  <li className = "cursor-pointer">
                            <span onClick = {logOut}>
                                <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                            </span>
                        </li>}
                      
                       
                    </ul>
                </div>

            </nav>

        </>
    )
}
