import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Table from './components/Table';
import EditPage from './components/EditPage';
import './App.css';

const App = () => {
  const tableNames = [
    'admin',
    'astrologer',
    'bank_details',
    'blog',
    'kundliinput',
    'orders',
    'products',
    'sliders',
    'testimonials',
    'transactions',
    'users',
  ];

  const [key, setKey] = useState(0);

  const handleLinkClick = () => {
    setKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    return () => {
      setKey(0);
    };
  }, []);

  return (
    <Router key={key}>
      <div className="app-container">
        <nav className="navbar">
          <ul className="navbar-menu">
            {tableNames.map((tableName) => (
              <li className="navbar-item " key={tableName}>
                <Link
                  to={`/${tableName}`}
                  className="navbar-link"
                  onClick={handleLinkClick}
                >
                  {tableName.charAt(0).toUpperCase() + tableName.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="content">
          <Routes>
            {tableNames.map((tableName) => (
              <Route
                key={tableName}
                path={`/${tableName}`}
                element={<Table tableName={tableName} />}
              />
            ))}
            {tableNames.map((tableName) => (
              <Route
                key={`edit-${tableName}`}
                path={`edit/${tableName}/:id`}
                element={<EditPage tableName={tableName} />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;