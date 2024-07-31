import { Outlet } from "react-router-dom";
import Header from "../../layout/Header";

const ClinetLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ClinetLayout;