import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { initLocalStorage } from './utils/initData'

import Header from './components/Header/Header'
import LoginModal from './components/Modals/LoginModal'
import SignupModal from './components/Modals/SignUpModal'
import MainPage from './pages/MainPage/MainPage'
import SearchPage from './pages/SearchPage/SearchPage'
import BookingPage from './pages/BookingPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'


function App() {
  useEffect(() => {
    initLocalStorage();
  }, []);
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState(null);
  const [user, setUser] = useState();


  const closeModal = () => {
    setModalMode(null)
  };
  const onLogout = () => {
    setUser(null);
    navigate("/")
  }


  return (
    <>
      <Header
        user={user}
        OnOpenLogin={() => setModalMode('login')}
      />
      {modalMode == 'login' &&
        <LoginModal
          onClose={() => closeModal()}
          OnOpenSignUp={() => setModalMode("signup")}
          setUser={setUser} />}
      {modalMode == 'signup' &&
        <SignupModal
          setUser={setUser}
          onClose={() => closeModal()} />}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="booking" element={<SearchPage />} />
        <Route path="my-booking" element={<BookingPage />} />
        <Route path='profile' element={<ProfilePage onLogout={onLogout} user={user} />} />
      </Routes>
    </>
  )
}

export default App
