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
import Level1Page from "./pages/Level1Page";
import Level2Page from "./pages/Level2Page";
import Level3Page from "./pages/Level3Page";
import Level4Page from "./pages/Level4Page";
import Level5Page from "./pages/Level5Page";
import Level6Page from "./pages/Level6Page";
import LostPage from "./pages/LostPage";
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
              <Route
                path="/level1"
                element={
                  <PrivateRoute>
                    <Level1Page />
                  </PrivateRoute>
                }
              />
              <Route
                path="/level2"
                element={
                  <PrivateRoute>
                    <Level2Page />
                  </PrivateRoute>
                }
              />
              <Route
                path="/level3"
                element={
                  <PrivateRoute>
                    <Level3Page />
                  </PrivateRoute>
                }
              />
              <Route
                path="/level4"
                element={
                  <PrivateRoute>
                    <Level4Page />
                  </PrivateRoute>
                }
              />
              <Route
                path="/level5"
                element={
                  <PrivateRoute>
                    <Level5Page />
                  </PrivateRoute>
                }
              />
              <Route
                path="/level6"
                element={
                  <PrivateRoute>
                    <Level6Page />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lost"
                element={
                  <PrivateRoute>
                    <LostPage />
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
