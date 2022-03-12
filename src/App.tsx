import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Channels } from './pages/Channels';
import { CreateUser } from './pages/CreateUser';

import { Home } from './pages/Home'
import { activeUser } from './redux/slice/authSlice';
import { auth } from './services/firebase';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/chat/:chatId" element={<Channels />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
