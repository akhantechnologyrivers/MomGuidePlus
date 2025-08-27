import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pregnancy from "./pages/Pregnancy";
import Appointments from "./pages/Appointments";
import Medications from "./pages/Medications";
import Records from "./pages/Records";
import MentalHealth from "./pages/MentalHealth";
import Devices from "./pages/Devices";
import VideoConsultations from "./pages/Video";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pregnancy" element={<Pregnancy />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/records" element={<Records />} />
        <Route path="/mental" element={<MentalHealth />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/video" element={<VideoConsultations />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </Layout>
  );
}

export default App;
