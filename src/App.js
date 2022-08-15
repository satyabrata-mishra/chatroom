import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import Setavatar from './Pages/Setavatar';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/setavatar" element={<Setavatar/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
