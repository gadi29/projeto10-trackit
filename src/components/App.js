import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import Main from './Main';
import Register from './Register';
import Habits from './Habits';
import Today from './Today';
import Record from './Record';

function App() {
  let userStorage = localStorage.getItem("user");

  if (userStorage !== null) {
    userStorage = JSON.parse(userStorage);
  }

  const [user, setUser] = useState(userStorage);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/habitos' element={<Habits />} />
          <Route path='/hoje' element={<Today />} />
          <Route path='/historico' element={<Record />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
