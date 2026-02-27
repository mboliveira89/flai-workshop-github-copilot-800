import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  const features = [
    { icon: '🍄', label: 'Users',       path: '/users',       desc: 'Power up your profile and track progress!' },
    { icon: '🏰', label: 'Teams',       path: '/teams',       desc: 'Build your crew and rescue the princess together.' },
    { icon: '⭐', label: 'Activities',  path: '/activities',  desc: 'Grab stars — log workouts every day!' },
    { icon: '🔥', label: 'Workouts',    path: '/workouts',    desc: 'Stay on plan with focused fitness sessions.' },
    { icon: '👑', label: 'Leaderboard',path: '/leaderboard', desc: 'Climb the ranks and save the Mushroom Kingdom!' },
  ];

  return (
    <>
      {/* Hero */}
      <div className="hero-section">
        {/* Floating question blocks */}
        <div className="mario-blocks" aria-hidden="true">
          <span className="mario-qblock">?</span>
          <span className="mario-qblock">?</span>
          <span className="mario-qblock">?</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>  
          <p className="hero-eyebrow">🍄 World 1-1 &nbsp;·&nbsp; Your Fitness Command Center</p>
          <h1 className="hero-heading">
            Welcome to <span className="accent">OctoFit</span><br />Tracker
          </h1>
          <p className="hero-subtext">
            🪙 Collect coins, crush goals, and race your team to the flagpole!
          </p>
          <div className="d-flex gap-3 flex-wrap align-items-center">
            <NavLink to="/users" className="btn btn-coral">▶ &nbsp;Start Game</NavLink>
            <NavLink to="/leaderboard" className="btn btn-outline-light-custom">🏆 &nbsp;Leaderboard</NavLink>
          </div>
        </div>

        {/* Mario character right side */}
        <div className="mario-character" aria-hidden="true">🧑‍🦱</div>
      </div>

      {/* Coin tally bar */}
      <div className="mario-hud">
        <span>🍄 &times;00 &nbsp; MARIO</span>
        <span>🪙 &times;00</span>
        <span>🌍 WORLD 1-1</span>
        <span>⏱ TIME 000</span>
      </div>

      {/* Feature cards */}
      <div className="feature-cards-row">
        {features.map(({ icon, label, path, desc }) => (
          <NavLink key={path} to={path} className="feature-card">
            <div className="feature-card-badge">{icon}</div>
            <p className="feature-card-title">{label}</p>
            <p className="feature-card-desc">{desc}</p>
          </NavLink>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            🍄 OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{ borderColor: 'rgba(255,255,255,0.3)' }}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-1">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' home-active' : '')
                  }
                >
                  Home
                </NavLink>
              </li>
              {[
                { to: '/users', label: 'Users' },
                { to: '/teams', label: 'Teams' },
                { to: '/activities', label: 'Activities' },
                { to: '/leaderboard', label: 'Leaderboard' },
                { to: '/workouts', label: 'Workouts' },
              ].map(({ to, label }) => (
                <li key={to} className="nav-item">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Router>
  );
}

export default App;
