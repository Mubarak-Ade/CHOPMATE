import { ArrowLeft, Lock, TextAlignCenter, Thermometer } from 'lucide-react'
import React from 'react'
import "../../verify.css"
import {Icon} from "../../components/custom/Icon"

export const Verification = () => {

  return (
    <section className='verify-card'>
      <div className='verify-lock'><Icon icon={Lock} /></div>

       <h2
       className='verify-title'>Verify your account</h2>

         <p className='verify-subtitle'>we've send a 6-digit verification code to

         </p>
          <p className='stronge'><strong>user@example.com</strong></p>


         <label
         className='verify-label'>Enter verification code</label>

           <div class="otp-wrapper">
           <div className='otp-container'>
                     <input type='text'
            maxLength={1} />
                     <input type='text'
            maxLength={1} />
                     <input type='text'
            maxLength={1} />
                    <input type='text'
            maxLength={1} />
                    <input type='text'
            maxLength={1} />
                    <input type='text'
            maxLength={1} />                                  
           </div>
</div>
           <button
           className='verify-button'>Verify Account</button>

                <p className='verify-resend'>
                  Didn't receive the code? <a
                  href='#'><strong className='resend'>Resend code</strong></a>
                </p>

                <a href='#'
                className='verify-change-email'>
                  <Icon icon={ArrowLeft} /> change email address</a>
                
    </section>
  );
}
    
      
      
