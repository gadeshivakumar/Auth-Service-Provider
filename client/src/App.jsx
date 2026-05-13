import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Test from "./pages/Test";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-project"
        element={
          <ProtectedRoute>
            <CreateProjectPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route path="/test" element={<Test/>}/>

      <Route path="*" element={<Navigate to="/" />} />


    </Routes>
  );
}

export default App;