import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccount from './App';
import Test from './test'; 
import './index.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<CreateAccount />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
