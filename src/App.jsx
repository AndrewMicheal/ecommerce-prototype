import { Toaster } from "react-hot-toast"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Login from "./Pages/Login/Login"
import NotFound from "./Pages/NotFound/NotFound"
import Register from "./Pages/Register/Register"
import Home from './Pages/Home/Home';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import UserProivder from "./Context/user.context"
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from "./Pages/Cart/Cart"
import CartProvider from "./Context/cart.context"
import Checkout from './Pages/Checkout/Checkout';
import AllOrders from './Pages/AllOrders/AllOrders';
import { WishList } from './Pages/WishList/WishList';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import VerfiyCode from './Pages/VerifyCode/VerfiyCode';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Brands from './Pages/Brand/Brands';
import Categories from './Pages/Categories/Categories';
import CategoryProvider from "./Context/category.context"
import WishListProvider from "./Context/addwishlist.context"
import { QueryClientProvider , QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


function App() {
  const routes = createBrowserRouter([
    {
      path: "/", element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ), children: [
        { index: true, element: <Home /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/brands", element: <Brands /> },
        { path: "/categories", element: <Categories /> },
        { path: "*", element: <NotFound /> }
      ]
    },
    {
      path: "/auth", element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verfiycode", element: <VerfiyCode /> },
        { path: "resetPassword", element: <ResetPassword /> }
      ]
    }
  ])
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client = {queryClient}>
        <UserProivder>
          <CartProvider>
            <CategoryProvider>
              <WishListProvider>
                <RouterProvider router={routes}></RouterProvider>
                {/* <ReactQueryDevtools position = "right"></ReactQueryDevtools> */}
                <Toaster />
              </WishListProvider>
            </CategoryProvider>
          </CartProvider>
        </UserProivder>
      </QueryClientProvider>
    </>
  )
}

export default App

