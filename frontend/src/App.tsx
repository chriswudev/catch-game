import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartMenu from './components/StartMenu';
import Leaderboard from './components/Leaderboard';
import CatchGame from './components/CatchGame';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <StartMenu />
      </nav>
      <Routes>
        <Route path="/game" element={<CatchGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
