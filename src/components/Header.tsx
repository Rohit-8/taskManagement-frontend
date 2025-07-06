import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/Header.css';
import { isLoggedIn, logout, login } from '../utils/auth';

function Header() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="app-logo" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>📦 Cataloger</span>
      </div>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        {loggedIn ? (
          <div className="profile-menu-wrapper" style={{position: 'relative', display: 'inline-block'}}>
            <span
              className="profile-icon"
              title="Profile"
              style={{cursor: 'pointer'}}
              onClick={() => setShowProfileMenu(v => !v)}
            >👤</span>
            {showProfileMenu && (
              <div
                className="profile-dropdown"
                ref={profileRef}
                onClick={e => e.stopPropagation()}
                style={{position: 'absolute', right: 0, top: '2.2rem', background: '#fff', border: '1px solid #eee', borderRadius: '0.7rem', boxShadow: '0 2px 8px rgba(60,60,120,0.10)', minWidth: '120px', zIndex: 1000}}
              >
                <button className="profile-dropdown-btn" style={{width: '100%', background: 'none', border: 'none', color: '#004f9e', fontWeight: 600, padding: '0.7rem 1rem', cursor: 'pointer', textAlign: 'left'}} onClick={e => { e.preventDefault(); navigate('/profile'); setShowProfileMenu(false); }}>View Profile</button>
                <button className="profile-dropdown-btn" style={{width: '100%', background: 'none', border: 'none', color: '#ef4444', fontWeight: 600, padding: '0.7rem 1rem', cursor: 'pointer', textAlign: 'left'}} onClick={e => {e.stopPropagation(); handleLogout(); setShowProfileMenu(false);}}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="auth-btn" onClick={handleLogin}>Login</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
