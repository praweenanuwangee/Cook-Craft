import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({setIsOpen}) {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [isSignUp, setIsSignUp] = useState(false)
   const [error, setError] = useState("")
   const [showPassword, setShowPassword] = useState(false)  // state for toggling password visibility
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)  // state for confirm password visibility

   const handleOnSubmit = async (e) => {
      e.preventDefault()

      if (isSignUp && password !== confirmPassword) {
         setError("Passwords do not match")
         return
      }

      let endpoint = (isSignUp) ? "signUp" : "login"
      await axios.post(`http://localhost:5000/${endpoint}`, { email, password })
         .then((res) => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            setIsOpen()
         })
         .catch(data => setError(data.response?.data?.error))
   }

   return (
      <>
         <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-control'>
               <label>Email</label>
               <input type="email" className='input' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='form-control'>
               <label>Password</label>
               <div className='password-wrapper'>
                  <input 
                     type={showPassword ? "text" : "password"} 
                     className='input' 
                     onChange={(e) => setPassword(e.target.value)} 
                     required 
                  />
                  <i 
                     className={`eye-icon ${showPassword ? "visible" : ""}`} 
                     onClick={() => setShowPassword(prev => !prev)} 
                  >👁️</i>
               </div>
            </div>
            {isSignUp && (
               <div className='form-control'>
                  <label>Confirm Password</label>
                  <div className='password-wrapper'>
                     <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        className='input' 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                     />
                     <i 
                        className={`eye-icon ${showConfirmPassword ? "visible" : ""}`} 
                        onClick={() => setShowConfirmPassword(prev => !prev)} 
                     >👁️</i>
                  </div>
               </div>
            )}
            <button type='submit'>{(isSignUp) ? "Sign Up" : "Login"}</button><br />
            {error !== "" && <h6 className='error'>{error}</h6>}<br />
            <p onClick={() => setIsSignUp(prev => !prev)}>
               {(isSignUp) ? "Already have an account" : "Create new account"}
            </p>
         </form>
      </>
   )
}
