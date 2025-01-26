import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import Login from "./Components/Login/Login";
import StudentsPage from "./Components/studentPage/StudentPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
