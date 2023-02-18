import React, { useState } from "react";
import MainLayout from "./layout/Layout";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
