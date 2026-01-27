import React from 'react'
import spoonImg from '../assets/images/spoon.png'
import appleLogoImg from '../assets/images/apple-logo.png'
import googleLogoImg from '../assets/images/google-logo.png'
import headerLogiImg from '../assets/images/header-logo.png'
import {Link} from 'react-router'

export function LoginPage() {

   return (
      <div>
         <div className="main-content">
            <div className="login-container">
               <div className="left-bar">
                  <div className="left-inner-content">

                     <h1>Welcome Back</h1>
                     <p className='title-text'>Log in to manage your restaurant dashboard.</p>
                     <form action="">
                        <label htmlFor="">Email Address</label>
                        <input type="text" placeholder='e.g. owner@restaurant.com' />
                        <div>
                           <label htmlFor="" className='password-label'>Password</label>
                           <a href="">Forgot Password?</a>
                        </div>
                        <input type="text" placeholder='Enter your password' />
                        <button>Login</button>
                     </form>
                     <div className="divider">
                        <span className='bottom-layout'>OR CONTINUE WITH</span>
                     </div>
                     <div className="link-buttons-container">
                        <button className="link-buttons">
                           <img className='google-logo' src={googleLogoImg} alt="google logo" /><span>Google</span>
                        </button>
                        <button className="link-buttons">
                           <img className='apple-logo' src={appleLogoImg} alt="apple logo" /><span>Apple</span>
                        </button>
                     </div>
                  </div>
               </div>

               <div className="right-bar">
                  <div className="img-container">
                     <img src={spoonImg} alt="image" />
                  </div>
                  <h1>New Here?</h1>
                  <p>Join our network of top-rated restaurants and start scaling your business today.</p>
                  <Link to="/signup/account" className='bg-white px-6 py-3 rounded-full text-sm'>Create Account</Link>
               </div>
            </div>
         </div>
      </div>
   )
}
