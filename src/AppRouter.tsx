import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PublicEventPage from './PublicEvent/PublicEventPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/event/:shortCode' element={<PublicEventPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
