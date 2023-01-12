// App.js
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import CompanyPage from "./pages/Company";
import CompanySignalsPage from "./pages/CompanySignals";
import Page404 from "./pages/Page404";
import StrategicIntelligenceSignalsPage from "./pages/StrategicIntelligenceSignals";
import TalentSignalsPage from "./pages/TalentSignals";

import "./App.css";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/companies" />} />
        <Route path="/companies" element={<CompanySignalsPage />} />
        <Route path="/talent" element={<TalentSignalsPage />} />
        <Route path="/si" element={<StrategicIntelligenceSignalsPage />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layout>
  );
};

export default App;
