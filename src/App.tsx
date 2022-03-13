import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Channels } from './pages/Channels';
import { Home } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Home />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/chat/:chatId" element={<Channels />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
