



import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import SectionHeader from "../components/SectionHeader";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    if (!name.trim()) { toast.error("Name is required"); return false; }
    if (!/^[A-Za-z\s]+$/.test(name.trim())) { toast.error("Name can only contain letters"); return false; }
    if (!email.trim()) { toast.error("Email is required"); return false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { toast.error("Invalid email format"); return false; }
    if (!password) { toast.error("Password is required"); return false; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return false; }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await register({ name, email, password });

      if (result.success) {
        
        toast.success("Signup successful! Please login to continue.");
        setTimeout(() => navigate("/login"), 1200);
      } else if (result.message === "User already exists") {
        toast.info("User already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
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
        <SectionHeader title="Sign Up" subtitle="Create your account" align="center" white/>
        <form onSubmit={onSubmit}>
          <input type="text" name="name" value={name} placeholder="Name" onChange={onChange} className="form-control mb-3"/>
          <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} className="form-control mb-3"/>
          <input type="password" name="password" value={password} placeholder="Password" onChange={onChange} className="form-control mb-3"/>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login" className="text-info fw-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;