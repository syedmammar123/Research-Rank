import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Home from './pages/home/home.jsx'
import SignUp from './pages/signup/signup.jsx'
import Protected from './components/Protected.jsx'
import Register from './pages/register/Register.jsx'
import Test from './pages/test.jsx'
import Landing from './pages/landing/landing.jsx'
import AppEntry from './pages/appEntry/appEntry.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path='/test' element={<Test/>} />
      
      {/* Landing page - public route */}
      <Route path="/" element={<Landing />} />
      
      {/* App routes - protected */}
      <Route path="/app" element={<App />} >
        <Route path="" element={<AppEntry />} />
        <Route path="login" element={<Login />} /> 
        <Route path="signup" element={<SignUp />} /> 
        
        <Route path="dashboard" element={<Protected />} >
            <Route path="" element={<Home />} />           
        </Route>
        <Route path="register" element={<Register />} /> 

      </Route> 

    </Routes>
      
      
      
    </BrowserRouter>

)
