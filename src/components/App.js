import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Register from './Register';
import Habits from './Habits';
import Today from './Today';
import Record from './Record';

function App() {
  const [showHeaderAndFooter, setShowHeaderAndFooter] = useState(false);

  return (
    <BrowserRouter>
      <Header showHeaderAndFooter={showHeaderAndFooter} />
      <Footer showHeaderAndFooter={showHeaderAndFooter} />
      <Routes>
        <Route path='/' element={<Main setShowHeaderAndFooter={setShowHeaderAndFooter} />}/>
        <Route path='/register' element={<Register setShowHeaderAndFooter={setShowHeaderAndFooter} />} />
        <Route path='/habitos' element={<Habits setShowHeaderAndFooter={setShowHeaderAndFooter} />} />
        <Route path='/hoje' element={<Today setShowHeaderAndFooter={setShowHeaderAndFooter} />} />
        <Route path='/historico' element={<Record setShowHeaderAndFooter={setShowHeaderAndFooter} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
