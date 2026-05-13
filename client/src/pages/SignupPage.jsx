import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const SignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", form);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">
          Signup
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;