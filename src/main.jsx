import React from 'react'
import ReactDOM from 'react-dom/client'
import AboutUs from '../src/Components/SubPages/AboutUs.jsx'
import Contact from '../src/Components/SubPages/Contact.jsx'
import Home from './Components/Home.jsx'
import Login from '../src/Components/Auth/Login.jsx'
import RegisterUser from '../src/Components/Auth/RegisterUser.jsx'
import Blogs from '../src/Components/SubPages/Blogs.jsx'
import Career from '../src/Components/SubPages/Career.jsx'
import FAQ from '../src/Components/SubPages/FAQ.jsx'
import PrivacyPolicy from '../src/Components/SubPages/PrivacyPolicy.jsx'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Cart from './Components/Cart/Cart.jsx'
import TermsConditions from './Components/SubPages/TermsConditions.jsx'
import ProductList from './Components/Product/ProductList.jsx'
import ProductDetails from './Components/Product/ProductDetails.jsx'
import ForgetPassword from './Components/Auth/ForgetPassword.jsx'
import ResetPassword from './Components/Auth/ResetPassword.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<AboutUs />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<RegisterUser />} />
      <Route path='cart' element={<Cart />} />
      <Route path='shop' element={<ProductList/>} />
      <Route path='blogs' element={<Blogs />} />
      <Route path='career' element={<Career />} />
      <Route path='faq' element={<FAQ />} />
      <Route path='privacy-policy' element={<PrivacyPolicy />} />
      <Route path='product-details' element={<ProductDetails />} />
      <Route path='terms-conditions' element={<TermsConditions />} />
      <Route path='forgot-password' element={<ForgetPassword/>} />
      <Route path='reset-password' element={<ResetPassword/>} />
      {/* <Route path='user/:userid' element={<User />} /> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
