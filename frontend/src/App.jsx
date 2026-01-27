import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router'
import {HomePage} from './pages/HomePage'
import {Header} from './components/Header'
import {Account} from './pages/Account'
import {Layout} from './components/signup/Layout'
import {Verification} from './pages/SignUp/Verification'


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
         <Route path='/signup' Component={Layout}>
            <Route index Component={Account} />
            <Route path='/signup/verification' Component={Verification} />
         </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
