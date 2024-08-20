import React, { useState } from "react";
import NavBar from "../../Pages/Navbar/NavBar.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";
import EmpRoutes from "./router/Routes.jsx";
import { HashRouter as Router } from "react-router-dom";
import "./DashboardEmployee.css";
import { useSidebar } from "../../Context/AttendanceContext/smallSidebarcontext.jsx";
import { useTheme } from "../../Context/TheamContext/ThemeContext.js";
import SidebarSlider from "../../Pages/Sidebar/SidebarSlider.jsx";
import Footer from "../../Pages/Footer/Footer.jsx";
import SidebarSmallScreen from "./SidebarSmallScreen.jsx";
import MainSidebar from "../../Utils/Sidebar/MainSidebar.jsx";

const DashboardEmployee = (props) => {
  const [checked, setChecked] = useState(true);
  const { isOpen } = useSidebar();
  const { darkMode } = useTheme();
  const handleChange = () => {
    console.log("switch");

    if (checked) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }

    setChecked(!checked);
  };

  return (
    <div
      style={{
        backgroundColor: darkMode
          ? "var(--secondaryDashMenuColor)"
          : "var(--secondaryDashColorDark)",
        maxHeight: "100vh",
        color: darkMode
          ? "var(--secondaryDashColorDark)"
          : "var(--secondaryDashMenuColor)",
        overflow: "hidden",
        position: "fixed",
        width: "100%",
        left: "0",
        top: "0",
      }}
    >
      <SidebarSlider />
      <Router>
        <div className="dashboard-grid-manager">
          <div
            style={{
              transform: isOpen ? "translateX(0%)" : "translateX(-500%)",
              transition: "1s ease",
            }}
            className="sidebarsmall d-flex "
          >
            <SidebarSmallScreen />
          </div>
          <div className="navbar-grid  shadow-sm">
            <NavBar
              loginInfo={props.data}
              checked={checked}
              handleChange={handleChange}
              onLogout={props.onLogout}
            />
          </div>
          <div className="sidebar-grid">
            <MainSidebar />
          </div>
          <div className="mainbar-grid py-5 py-md-3">
            <EmpRoutes data={props.data} />
            <div
              style={{ zIndex: "50", position: "absolute", bottom: "0" }}
              className="HrPannelFooter bg-dark w-100 text-white"
            >
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default DashboardEmployee;
