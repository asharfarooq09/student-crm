import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' in React 18
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './AuthProvider'; // The AuthProvider context
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/StudentsPage';
import TemporaryDrawer from './Components/sidebar/Sidebar';


const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <AuthProvider>
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sidebar" element={<TemporaryDrawer />}>
          <Route path="students" element={<StudentsPage />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);
