import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StartMenu from './components/StartMenu';
import Leaderboard from './components/Leaderboard';
import CatchGame from './components/CatchGame';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StartMenu />} />
        <Route path="/game" element={<CatchGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
