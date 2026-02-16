import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './Components/Header/Header'
import LoginModal from './Components/Modals/LoginModal'
import SignupModal from './Components/Modals/SingUpModal'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SeachPage'
import BookingPage from './pages/BookingPage'


function App() {
  const [count, setCount] = useState(0)
  const [isAuth, setIsAuth] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [user, setUser] = useState(null);

  const closeModal = () => setModalMode(null);

  return (
    <>
      <Header
        isAuth = {isAuth}
        user = {user}
        OnOpenLogin = {()=> setModalMode('login')}
      />
      {modalMode == 'login' && <LoginModal onClose={()=> closeModal()}/>}
      {modalMode == 'signup' && <SignupModal/>}
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="booking" element={<SearchPage/>}/>
        <Route path="my-booking" element={<BookingPage/>}/>
      </Routes>
    </>
  )
}

export default App
