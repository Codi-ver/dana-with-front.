// App.jsx - فقط مسیرها اینجان!
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutUsPage from "./pages/ContactUsPage";
import HiringPage from "./pages/HiringPage";
import ServicesPage from "./pages/ServicesPage";
import ServicesAddPage from "./pages/ServicesAddPage";
import NewsPage from "./pages/NewsPage";
import OneNewsPage from "./pages/OneNewsPage";
import NewsPageAdd from "./pages/NewsPageAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contactUs" element={<AboutUsPage />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/servicesAdd" element={<ServicesAddPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<OneNewsPage />} />
        <Route path="/news/add" element={<NewsPageAdd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
