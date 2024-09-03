import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Section from './components/Section/Section';
import Footer from './components/Footer/Footer';
import Main from './components/Main';
import PolyGlot from './pages/Polyglot/Polyglot';

function App() {
  return (
    <Router>
      <div className="App">
          <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path='/Main' element={<Main />} />
              <Route path="/Polyglot" element={<PolyGlot />} /> 
            </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
