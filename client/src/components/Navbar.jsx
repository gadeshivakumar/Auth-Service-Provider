import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.log(err);
    }
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-600">
        OAuthHub
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;