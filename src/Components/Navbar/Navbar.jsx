import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/images/freshcart-logo.svg";
import { cartContext } from '../../Context/cart.context';
import { userContext } from './../../Context/user.context';


export default function Navbar() {
    const { token, logOut } = useContext(userContext);
    const { getCartInfo, cartInfo } = useContext(cartContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        if (cartInfo?.length !== 0) {
            getCartInfo();
        }
    }, [])
    return (
        <>
            {/* <nav className="p-4 bg-slate-100 w-full fixed left-0 right-0 top-0 z-50">
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

            </nav> */}

            <nav className="p-2 bg-slate-100 w-full fixed left-0 right-0 top-0 z-50 shadow-md">
                <div className="container p-2 flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="#" className="text-green-500 text-xl font-bold flex items-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4 8h14.6a1 1 0 001-1L20 3H4.6M7 13v6a1 1 0 001 1h8a1 1 0 001-1v-6m-8 6V9m4 10V9m4 10V9"></path></svg>
                            FreshCart
                        </a>
                    </div>
                    {token ?
                        <div>

                            <ul className="flex gap-6 items-center hidden md:flex space-x-4">
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                    }} to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                    }} to="/categories">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                    }} to="/brands">Brands</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                    }} to="/wishlist">wish list</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                    }} to="/allorders">Orders</NavLink>
                                </li>

                                <Link to={`/cart`} className="ms-auto text-lg relative">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    {token && cartInfo?.length !== 0 ? <span className="bg-primary absolute w-6 rounded-full h-6 text-sm font-bold text-white flex justify-center items-center top-0 right-0 translate-x-1/2 -translate-y-1/2">{cartInfo?.numOfCartItems}</span> : ""}
                                </Link>

                            </ul>


                        </div> : ""}
                    <div className="flex space-between">
                        <ul className="flex  items-center space-x-4">
                            <li>
                                <a href="#" className="text-gray-700 "><i className="fab fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 "><i className="fab fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 "><i className="fab fa-tiktok"></i></a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 "><i className="fab fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 "><i className="fab fa-linkedin"></i></a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 "><i className="fab fa-youtube"></i></a>

                            </li>
                        </ul>
                        <ul className="flex  items-center ms-3">
                            {!token ? <>
                                <li className="me-3">
                                    <NavLink className={({ isActive }) => {
                                        return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                    }} to="/auth/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => {
                                        return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                                    }} to="/auth/signup">Sign up</NavLink>
                                </li>
                            </> : <li className="cursor-pointer">
                                <span onClick={logOut}>
                                    <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                                </span>
                            </li>}
                        </ul>
                    </div>
                    {token ? <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="mobile-menu-button">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div> : ""}
                </div>
                {!token ? "" : <div className={`${isOpen ? '' : 'hidden'} mobile-menu md:hidden`}>
                    <ul>
                        <li className="mb-3">
                            <NavLink className={({ isActive }) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/">Home</NavLink>
                        </li>
                        <li className="mb-3">
                            <NavLink className={({ isActive }) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/categories">Categories</NavLink>
                        </li>
                        <li className="mb-3">
                            <NavLink className={({ isActive }) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/brands">Brands</NavLink>
                        </li>
                        <li className="mb-3">
                            <NavLink className={({ isActive }) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/wishlist">wish list</NavLink>
                        </li>
                        <li className="mb-3">
                            <NavLink className={({ isActive }) => {
                                return `relative hover:font-bold hover:before:w-full before:transition-[width] before:duration-300 before:h-[2px] before:bg-primary before:absolute before:left-0 before:-bottom-1 ${isActive ? "font-bold before:w-full" : "before:w-0"}`
                            }} to="/allorders">Orders</NavLink>
                        </li>
                        <Link to={`/cart`} className="ms-auto text-lg relative">
                            <i className="fa-solid fa-cart-shopping"></i>
                            {token && cartInfo?.length !== 0 ? <span className="bg-primary absolute w-6 rounded-full h-6 text-sm font-bold text-white flex justify-center items-center top-0 right-0 translate-x-1/2 -translate-y-1/2">{cartInfo?.numOfCartItems}</span> : ""}
                        </Link>
                    </ul>
                </div>}
            </nav>

        </>
    )
}
