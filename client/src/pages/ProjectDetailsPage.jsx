import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const ProjectDetailsPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState(false);
  const [redirectUris, setRedirectUris] = useState("");

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await API.get("/projects");

      const current = res.data.find((p) => p._id === id);

      setProject(current);
      setRedirectUris(current.redirect_uris);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProject = async () => {
    try {

      await API.patch(`/projects/${id}`,
        {
          redirect_uris: redirectUris,
        },
        {
          withCredentials:true
        }
      );

      setEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!project) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-8">
          {project.name}
        </h1>

        <div className="space-y-6">
          <div>
            <label className="font-semibold block mb-2">
              Client ID
            </label>

            <input
              value={project.client_id}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Client Secret
            </label>

            <input
              value={project.client_secret}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Redirect URIs
            </label>

            <textarea
              disabled={!editing}
              value={redirectUris}
              onChange={(e) =>
                setRedirectUris(e.target.value)
              }
              className="w-full border p-3 rounded-lg h-32"
            />
          </div>

          <div className="flex gap-4">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={updateProject}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;