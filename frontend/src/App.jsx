import {Route, Routes} from 'react-router'
import {HomePage} from './pages/HomePage'
import {Header} from './components/Header'
import {Layout} from './components/signup/Layout'
import {Verification} from './pages/SignUp/Verification'
import {RestaurantInfo} from './pages/SignUp/RestaurantInfo'
import {Plan} from './pages/SignUp/Plan'
import {Account} from './pages/SignUp/Account'
import {Footer} from './components/Footer'
import {ConfirmPage} from './pages/SignUp/ConfirmPage'
import {Location} from './pages/SignUp/Location'
import {OperatingHours} from './pages/SignUp/OperatingHours'
import {LoginPage} from './pages/LoginPage'

import RestaurantDetails from './pages/RestaurantDetails'
import CartInfo from './pages/CartInfo'


function App() {
  return (
    <>      
      <Header />3
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' Component={LoginPage} />
         <Route path='/signup' Component={Layout}>
            <Route index path='account' Component={Account} />
            <Route path='verify' Component={Verification} />
            <Route path='info' Component={RestaurantInfo} />
            <Route path='location' Component={Location} />
            <Route path='plan' Component={Plan} />
            <Route path='operation' Component={OperatingHours} />
            <Route path='confirm' Component={ConfirmPage} />
         </Route>
      </Routes>
      <Footer /> 
    </>
  )
}

export default App
