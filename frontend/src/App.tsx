import React, { useEffect, useState } from "react";
import MainLayout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFoundPage from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route element={<h1>Login</h1>} path="/login" />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
