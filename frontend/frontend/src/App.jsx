

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Features from "./pages/Feature";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Music from "./pages/Music";
import Exercises from "./pages/Exercise";
import Mediation from "./pages/Meditation";
import Footer from "./components/Footer";
import Resources from "./pages/Resources";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Journal from "./pages/Journal";
import ScorePage from "./pages/ScorePage.jsx";
import Profile from "./pages/Profile";

import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

    
          <Route path="/features" element={
            <ProtectRoute>
              <Features />
            </ProtectRoute>
          } />
          <Route path="/features/music" element={
            <ProtectRoute>
              <Music />
            </ProtectRoute>
          } />
          <Route path="/features/exercises" element={
            <ProtectRoute>
              <Exercises />
            </ProtectRoute>
          } />
          <Route path="/features/meditation" element={
            <ProtectRoute>
              <Mediation />
            </ProtectRoute>
          } />
          <Route path="/features/resource" element={
            <ProtectRoute>
              <Resources />
            </ProtectRoute>
          } />
          <Route path="/features/journal" element={
            <ProtectRoute>
              <Journal />
            </ProtectRoute>
          } />
         <Route path="/features/score" element={
            <ProtectRoute>
              <ScorePage />
            </ProtectRoute>
          } />
          <Route path="/profile" element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;


