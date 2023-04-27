import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./utils/AdminRoute";
import PrivateRoute from "./utils/PrivateRoute";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import StartPage from "./pages/StartPage";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
        <div>
          <NavBar />
        </div>
        <div className="flex-grow justify-center py-10 px-4 mb-auto">
          <div className="w-full space-y-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <DashboardPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/start"
                element={
                  <PrivateRoute>
                    <StartPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
