import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Properties from './components/Properties';
import Login from './components/Login';
import AdminSignup from './components/AdminSignup';
import AddHouse from './components/AddHouse';
import PropertyAssistant from './components/PropertyAssistant';
import ChatAssistant from './components/ChatAssistant';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/add-house" element={<AddHouse />} />
          <Route path="/assistant" element={<PropertyAssistant />} />
        </Routes>
        <ChatAssistant />
      </div>
    </Router>
  );
};

export default App;
