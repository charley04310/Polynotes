import React, { useEffect } from "react";
import MainLayout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFoundPage from "./pages/notfound/NotFound";

import ManifestPage from "./pages/manifest/ManifestPage";
import { Provider } from "react-redux";
import store from "./store/store";
import PublicRoutes from "./routes/PublicRoutes";
import EditDocumentPage from "./pages/document/EditDocumentPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainLayout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/document" element={<EditDocumentPage />} />
            <Route path="/accueil" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/document/:id" element={<EditDocumentPage />} />
          <Route element={<PublicRoutes />}>
            <Route element={<ManifestPage />} path="/authentification" />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MainLayout>
    </Provider>
  );
};

export default App;
