import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { RequireAuth, RequireAdmin } from "./components/Guards";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import OneNewsPage from "./pages/OneNewsPage";
import NewsAddPage from "./pages/NewsAddPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceAddPage from "./pages/ServiceAddPage";
import HiringPage from "./pages/HiringPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/add" element={<RequireAdmin><NewsAddPage /></RequireAdmin>} />
            <Route path="/news/:id" element={<OneNewsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/add" element={<RequireAdmin><ServiceAddPage /></RequireAdmin>} />
            <Route path="/hiring" element={<HiringPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={<RequireAuth><DashboardPage /></RequireAuth>}
            />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
