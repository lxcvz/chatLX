import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Channels } from './pages/Channels';
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Home />} />
        <Route path="/channels" element={
          <ProtectedRoute>
            <Channels />
          </ProtectedRoute>
        } />
        <Route path="/chat/:chatId" element={
          <ProtectedRoute>
            <Channels />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
