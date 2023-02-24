import React from "react";
import MainLayout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFoundPage from "./pages/NotFound";

import ManifestPage from "./pages/manifest/ManifestPage";
import { Provider } from "react-redux";
import store from "./stores/store";
import PublicRoutes from "./routes/PublicRoutes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainLayout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route element={<ManifestPage />} path="/acceuil" />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MainLayout>
    </Provider>
  );
};

export default App;
