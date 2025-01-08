import React , {lazy, Suspense, useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import { createRoot } from 'react-dom/client'
import './index.css'
import Theme from './Contexts/Theme.jsx'
import Login from './Components/Login.jsx'
import Admin from './Components/Admin.jsx'
import { AuthProvider } from "./hooks/Auth"
import Loading from './Components/Loading.jsx'

const App = lazy(() => import('./App.jsx'))
const Track = lazy(() => import('./Components/TrackYourParcle.jsx'))
const About = lazy(() => import('./Pages/About.jsx'))
const Contact = lazy(() => import('./Pages/Contact.jsx'))


// Create a root component to handle the dark mode state
function Root() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <AuthProvider>
<Theme.Provider  value={[isDarkMode, setIsDarkMode]}>

<BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<App   />} />
          <Route path="/track" element={<Track  />} />
          <Route path="/aboutus" element={<About  />} />
          <Route path="/contactus" element={<Contact   />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    
    </Theme.Provider>
    </AuthProvider>

    
      );
}
createRoot(document.getElementById('root')).render(<Root />);