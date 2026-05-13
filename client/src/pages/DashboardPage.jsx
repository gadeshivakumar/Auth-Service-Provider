import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-5">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Your Projects
          </h1>

          <button
            onClick={() => navigate("/create-project")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            + Create Project
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;