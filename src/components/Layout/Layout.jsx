import React from "react";
import { useLocation } from "react-router-dom";

/* ------------------------------- components ------------------------------- */
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

/* ---------------------------------- admin --------------------------------- */
import AdminNav from "../../admin/AdminNav";

import Routers from "../../routers/Routers";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
