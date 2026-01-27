import React from 'react'

export default function TimeBreak(props) {
   return (
      <>
      <div className='schedule'>

         <div className="left-schedule">

            <div className="left-toggle">
               <label class="switch">
                  <input type="checkbox"  />
                  <span class="slider"></span>
               </label>
               <label className='label-prop' htmlFor="">{props.day}</label>
            </div>
            
            <div className="right-time">
               <input type="time" value='09:00'/>
               <span>to</span>
               <input type="time" value='09:00' />
            </div>

         </div>

         <button>+ Add break</button>


      </div>
      </>
   )
}
