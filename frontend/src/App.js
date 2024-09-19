import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from "./components/Navbar";
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyOtp from './pages/VerifyOtp';
import Home from './pages/Home';
import ChatPage from './pages/Chats';
import ImageUploadPage from './pages/Image';

function App() {
  
const { user } = useSelector(state => state.profile);
const {token} = useSelector(state=>state.auth)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <hr className="border-purple-300 w-full " />
        <Routes>
        {/* <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} /> */}
        <Route path="/" element={<Home/>}/>
         <Route path="/signup" element={<Signup />} />
         <Route path= "/login" element={<Login/>}/>
         <Route path= "/verify-email" element={<VerifyOtp/>}/>
         <Route path= "/chat" element={<ChatPage/>}/>
         <Route path= "/image" element={<ImageUploadPage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
