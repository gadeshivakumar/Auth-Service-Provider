import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const CreateProjectPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    redirect_uris: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", form);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Create Project
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            className="w-full border p-3 rounded-lg mb-4"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            placeholder="Redirect URIs"
            className="w-full border p-3 rounded-lg mb-6 h-32"
            onChange={(e) =>
              setForm({
                ...form,
                redirect_uris: e.target.value,
              })
            }
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;