

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import SectionHeader from "../components/SectionHeader";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    if (!email.trim()) { toast.error("Email is required"); return false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { toast.error("Invalid email"); return false; }
    if (!password) { toast.error("Password is required"); return false; }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await login({ email, password });

      if (result.success) {
        toast.success("Login successful!");
        setTimeout(() => navigate("/features"), 1000);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page" style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('https://res.cloudinary.com/dmdlgpurh/image/upload/v1736879584/pexels-souvenirpixels-1542493_dke22u.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <ToastContainer />
      <div className="card shadow-lg p-4" style={{
        maxWidth: "400px",
        width: "100%",
        borderRadius: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        backdropFilter: "blur(8px)"
      }}>
        <SectionHeader title="Login" subtitle="Welcome back" align="center" white/>
        <form onSubmit={onSubmit}>
          <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} className="form-control mb-3"/>
          <input type="password" name="password" value={password} placeholder="Password" onChange={onChange} className="form-control mb-3"/>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register" className="text-info fw-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;