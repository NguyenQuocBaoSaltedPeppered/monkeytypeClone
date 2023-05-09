import { Routes, Route } from 'react-router-dom'
import './App.css'
import Editor from './components/Editor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLogin from './components/pageLogin'
import Account from './components/pageAccount'
import PrivateRoute from './components/pageLogin/Utils/PrivateRoute'

const App = () => {
  return (
    <div className="App">
      <div id="center-content">
        <div id="top">
          <Navbar />
        </div>
        <div id="middle">
          <Routes>
            <Route path="/" element={<Editor />} />
            <Route path="/login" element={<PageLogin />} />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <div id="bottom">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
