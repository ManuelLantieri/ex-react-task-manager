import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
};

export default AppLayout;
