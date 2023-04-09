import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MainLayout from "../layout/Layout";
import EditDocumentPage from "../pages/document/EditDocumentPage";
import SharedDocumentPage from "../pages/document/SharedDocumentPage";
import HomePage from "../pages/home/HomePage";
import Authentification from "../pages/auth/Authentification";
import NotFoundPage from "../pages/notfound/NotFound";
import PrivateRoutes from "../routes/PrivateRoutes";
import PublicRoutes from "../routes/PublicRoutes";
import { autoLogin } from "../store/API/Authentification";
import { getTreeFileSystem } from "../store/API/FileSystemTree";
import {
  IReponseError,
  IReponseSuccess,
} from "../store/API/SuccessErrorMessage";
import { setIsAuthenticated, setUser } from "../store/slices/authSlice";
import { setStore } from "../store/slices/TreeFileExplorerSlice";
import { RootState } from "../store/store";
import ManifestPage from "../pages/manifest/Manifest";
import TermsPage from "../pages/Terms/TermsPage";

const userAutoLogin = async (): Promise<IReponseSuccess | IReponseError> => {
  const userLogedIn = await autoLogin();
  return userLogedIn;
};

// Path: frontend/src/router/PrivateRoutes.tsx
const PolynoteRouter: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      // si l'utilisateur est sur la page d'authentification, on ne fait rien
      if (
        location.pathname === "/authentification" ||
        location.pathname === "/getting-started"
      )
        return;
      // sinon on verifie si l'utilisateur est connecté
      const isLoggedIn = await userAutoLogin();
      console.log("isLoggedIn :", isLoggedIn);
      if (isLoggedIn.message === undefined) {
        dispatch(setIsAuthenticated(false));
        dispatch(setUser(undefined));
        return;
      }
      // si le server repond qu'il est connecté, on met a jour le store
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(isLoggedIn.user));
      const userId = isLoggedIn.user?.userId;
      if (userId === undefined) return;
      const tree = await getTreeFileSystem(userId);
      if (tree === undefined) return;
      dispatch(setStore(tree));
    })();
  }, [dispatch, location.pathname]);

  return (
    <MainLayout>
      <Routes>
        <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
          <Route element={<Authentification />} path="/authentification" />
          <Route element={<ManifestPage />} path="/getting-started" />
          <Route element={<TermsPage />} path="/terms" />
        </Route>
        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/document/:id" element={<EditDocumentPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/collaborative/document/:id"
          element={<SharedDocumentPage />}
        />
      </Routes>
    </MainLayout>
  );
};

export default PolynoteRouter;
