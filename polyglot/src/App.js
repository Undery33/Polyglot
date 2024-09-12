import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useTranslation } from 'react-i18next';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main';
import PolyGlot from './pages/Polyglot/Polyglot';
import Howtouse from './pages/Howtouse/Command';
import Issue from './pages/Issue/Pathnote';
import Useweb from './pages/Useweb/Useweb';

function App() {
  const {t} = useTranslation();
  
  return (
    <Router>
      <div className="App">
          <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path='/Main' element={<Main />} />
              <Route path="/Polyglot" element={<PolyGlot />} /> 
              <Route path="/How2use" element={<Howtouse />} />
              <Route path='/Issue' element={<Issue />} />
              <Route path='/UseWeb' element={<Useweb />} />
            </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
