import '../styles/RestaurantDetails.css'
import { menuItems } from '../jsFiles/menu.js'
import menuImg from '../assets/menu-img.jpg'
import { Icon } from '../components/custom/Icon.jsx'
import { Clock, Globe, MapPin, Phone, Star } from 'lucide-react'


export default function RestaurantDatails() {
   return (
      <div>
         <img className="menu-img" src={menuImg} alt="menu image" />
         <main className='main-container'>
            <div className="left-section">
               <div className="left-section-top">
                  <h1>The Golden Spoon</h1>
                  <p> 
                     <span style={{color: '#e6e600'}}><Icon icon={Star} size={18} /></span>
                     <span>
                        <span style={{color: '#000', fontWeight: 'bold'}}>4.5 </span>
                        (215 reviews) &#183; Italian &#183; $$
                     </span>
                  </p>
                  <ul>
                     <li>Italian</li>
                     <li>Pizza</li>
                     <li>Pasta</li>
                     <li>Cozy Ambiance</li>
                  </ul>
               </div>
               <hr className='hr-left' />
               <div className="left-section-bottom">
                  <div>
                     <span className='icons'><Icon icon={MapPin} size={18} /></span>
                     <p>
                        123 Culinary Lane, Foodie City, 10001 <br />
                        <span className='require-red'>Get Directions</span>
                     </p>
                  </div>
                  <div>
                     <span className='icons'><Icon icon={Clock} size={18} /></span>
                     <p>
                        Open today until 11:00 PM <br />
                        <span className='require-red'>View all hours</span>
                     </p>
                  </div>
                  <div>
                     <span className='icons'><Icon icon={Phone} size={18} /></span>
                     <p>(123) 456-7890</p>
                  </div>
                  <div>
                     <span className='icons'><Icon icon={Globe} size={18} /></span>
                     <p className='require-red'>thegoldenspoon.com</p>
                  </div>
               </div>
               <hr className='hr-left' />
               <div className="order-btn-container">
                  <button>Make a Reservation</button>
                  <button>Place an Order</button>
               </div>
            </div>
            <div className="right-section">
               <div className="main-nav">
                  <button>Menu</button>
                  <button>Reviews</button>
                  <button>Photos</button>
               </div>
               <hr className='hr-right' />
               <div className="menu-container">
                  {menuItems.map((item, index) => {
                     return (
                        <div key={index}>
                           <p className='category-name'>{item.categoryName}</p>
                           <div className="menu-items">
                              {item.details.map(subItem => {
                                 return (
                                    <ul key={subItem.id}>
                                       <li className='name'>{subItem.itemName}</li>
                                       <li className='description'>{subItem.description}</li>
                                       <li className='price'>{subItem.price}</li>
                                    </ul>
                                 );
                              })}
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </main>

      </div>
   )
}
