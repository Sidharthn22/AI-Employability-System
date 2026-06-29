import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import JobMatch from "./pages/JobMatch";
import ATSChecker from "./pages/ATSChecker";
import About from "./pages/About";
import UploadResume from "./pages/UploadResume";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-match" element={<JobMatch />} />
        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<UploadResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;