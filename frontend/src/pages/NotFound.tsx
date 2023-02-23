import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/acceuil");
    }, 200);
  }, [navigate]);

  return <h1>Not found Page</h1>;
};

export default NotFoundPage;
