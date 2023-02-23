import React, { useEffect, useState } from "react";
import MainLayout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFoundPage from "./pages/NotFound";

import ManifestPage from "./manifest/ManifestPage";

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        
        <Route element={<ManifestPage />} path="/acceuil" />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
