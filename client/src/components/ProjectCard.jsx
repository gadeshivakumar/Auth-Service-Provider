import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevents navigation

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${project._id}`);

      if (onDelete) {
        onDelete(project._id);
      }

      alert("Project deleted successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  return (
    <div
      onClick={() => navigate(`/projects/${project._id}`)}
      className="bg-white p-6 rounded-2xl shadow hover:shadow-xl cursor-pointer transition relative"
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
      >
        Delete
      </button>

      <h2 className="text-xl font-semibold mb-2">
        {project.name}
      </h2>

      <p className="text-gray-500 text-sm break-all">
        {project.redirect_uris}
      </p>
    </div>
  );
};

export default ProjectCard;