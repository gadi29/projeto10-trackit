import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Register from './Register';

function App() {
  const [showHeader, setShowHeader] = useState(true);

  return (
    <BrowserRouter>
      <Header showHeader={showHeader} />
      <Routes>
        <Route path='/' element={<Main setShowHeader={setShowHeader} />}/>
        <Route path='/register' element={<Register setShowHeader={setShowHeader} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
