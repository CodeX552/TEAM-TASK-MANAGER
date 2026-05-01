import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import SignupPage from "./pages/SignupPage";
import TasksPage from "./pages/TasksPage";

const App = () => (
  <div className="min-h-screen relative overflow-hidden text-slate-100">
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />
      <div className="absolute top-32 right-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" style={{ animationDelay: "2.3s" }} />
    </div>
    <div className="relative z-10">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  </div>
);

export default App;
