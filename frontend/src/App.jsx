import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import "./styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AlumniList from "./components/AlumniList";
import Gallery from "./components/Gallery";
import Careers from "./components/Careers";
import Forum from "./components/Forum";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyAccount from "./components/MyAccount";
import Dashboard from "./admin/Dashboard";
import DonationDetail from "./admin/DonationDetail";
import AdminHome from "./admin/AdminHome";
import AdminCourses from "./admin/AdminCourses";
import AdminUsers from "./admin/AdminUsers";
import AdminGallery from "./admin/AdminGallery";
import AdminSettings from "./admin/AdminSettings";
import AdminEvents from "./admin/AdminEvents";
import AdminForum from "./admin/AdminForum";
import AdminAlumni from "./admin/AdminAlumni";
import AdminJobs from "./admin/AdminJobs";
import AdminDonations from "./admin/AdminDonations";
import ManageJobs from "./admin/save/ManageJobs";
import View_Event from "./components/view/View_Event";
import ManageEvents from "./admin/save/ManageEvents";
import View_Forum from "./components/view/View_Forum";
import ManageForum from "./admin/save/ManageForum";
import ManageUser from "./admin/save/ManageUser";
import ViewAlumni from "./admin/view/ViewAlumni";
import { AuthProvider, useAuth } from "./AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Manage_Career from "./components/manage/Manage_Career";
import "react-quill/dist/quill.snow.css";
import { ThemeProvider } from "./ThemeContext";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import ManageDonations from "./admin/save/ManageDonations";
import Donations from "./components/Donations";
import AnnualReport from "./admin/view/AnnualReport";
import Publications from "./components/user/Publication";
import AdminPublications from "./admin/AdminPublications";
import AdminDepartments from "./admin/AdminDepartments";
import Faculties from "./departmentCoordinator/Faculties";
import PendingRequest from "./departmentCoordinator/PendingRequest";
import DepartmentDetails from "./departmentCoordinator/DepartmentDetails";
import DepartmentEvent from "./departmentCoordinator/DepartmentEvent";
import DeptCoordDashboard from "./departmentCoordinator/DeptCoordDashboard";
import LandingPageV1Desktop from "./landing/pages/LandingPageV1Desktop";
import Achievements from "./components/user/Achievements";
import AnnualReportHistory from "./admin/view/AnnualReportHistory";
import DeptPublications from "./departmentCoordinator/DeptPublications";
import DeptAchievements from "./departmentCoordinator/DeptAchievements";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function AppRouter() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  const { isLoggedIn, isAdmin } = useAuth();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Header />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<LandingPageV1Desktop />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/alumni" element={<AlumniList />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/jobs" element={<Careers />} />
        <Route path="/donate" element={<Donations />} />
        <Route path="/forums" element={<Forum />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isLoggedIn && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<AdminHome />} />

            <Route
              path="/dashboard/deptcoord/depdash"
              element={<DeptCoordDashboard />}
            ></Route>
            <Route path="deptcoord/faculties" element={<Faculties />} />
            <Route
              path="deptcoord/pendingrequests"
              element={<PendingRequest />}
            />
            <Route
              path="deptcoord/departmentdetails"
              element={<DepartmentDetails />}
            />
            <Route
              path="deptcoord/publications"
              element={<DeptPublications />}
            />
            <Route
              path="deptcoord/achievements"
              element={<DeptAchievements />}
            />
            <Route
              path="deptcoord/departmentevents"
              element={<DepartmentEvent />}
            />
            <Route path="/dashboard/publications" element={<Publications />} />
            <Route path="/dashboard/users" element={<AdminUsers />} />
            <Route path="/dashboard/gallery" element={<AdminGallery />} />
            <Route path="/dashboard/settings" element={<AdminSettings />} />
            <Route path="/dashboard/events" element={<AdminEvents />} />
            <Route path="/dashboard/forum" element={<AdminForum />} />
            <Route path="/dashboard/alumnilist" element={<AdminAlumni />} />
            <Route path="/dashboard/achievements" element={<Achievements />} />
            <Route path="/dashboard/jobs" element={<AdminJobs />} />
            <Route path="/dashboard/donations" element={<AdminDonations />} />
            <Route path="/dashboard/report" element={<AnnualReport />} />
            <Route
              path="/dashboard/report/history"
              element={<AnnualReportHistory />}
            />
            <Route
              path="/dashboard/adminpublications"
              element={<AdminPublications />}
            />
            <Route
              path="/dashboard/admindepartments"
              element={<AdminDepartments />}
            />
            <Route
              path="/dashboard/donations/:id"
              element={<DonationDetail />}
            />
            <Route path="/dashboard/jobs/manage" element={<ManageJobs />} />
            <Route
              path="/dashboard/donations/manage"
              element={<ManageDonations />}
            />
            <Route path="/dashboard/events/manage" element={<ManageEvents />} />
            <Route path="/dashboard/forum/manage" element={<ManageForum />} />
            <Route path="/dashboard/users/manage" element={<ManageUser />} />
            <Route path="/dashboard/alumni/view" element={<ViewAlumni />} />
          </Route>
        )}

        {/* <Route path="" element={<DeptCoordHome />} /> */}

        <Route path="events/view" element={<View_Event />} />
        {isLoggedIn && <Route path="account" element={<MyAccount />} />}
        <Route path="forum/view" element={<View_Forum />} />
        <Route path="jobs/add" element={<ManageJobs />} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;
