import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AdminLayout;