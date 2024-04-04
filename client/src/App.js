import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import ChatRoom from './Pages/Home/ChatRoom';




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/a/:id' element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
