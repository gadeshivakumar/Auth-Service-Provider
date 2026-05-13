import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const next = params.get("next");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        {
          ...form,
          next,
        },
        {
          withCredentials: true,
        },
      );

      login(res.data);
      console.log(res.data.redirect)
      
      if (res.data.redirect) {
        console.log("hello")
        window.location.href = res.data.redirect;
        return;
      }

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">
          Login
        </button>

        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
