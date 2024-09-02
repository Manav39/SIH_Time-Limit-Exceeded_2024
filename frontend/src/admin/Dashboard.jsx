import React, { useEffect, useState } from "react";
import SidebarUser from "./SidebarUser";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SidebarDeptCoord from "./SidebarDeptCoord";
import SidebarAdmin from "./SidebarAdmin";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const r = localStorage.getItem("role");
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      {r === "user" && (
        <SidebarUser isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      {r === "department_coordinator" && (
        <SidebarDeptCoord isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      {r === "admin" && (
        <SidebarAdmin isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <main id="main" className={`main ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Outlet />
      </main>
    </>
  );
};

export default Dashboard;
