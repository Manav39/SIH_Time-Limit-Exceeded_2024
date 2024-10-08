import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiBook, FiUsers, FiClipboard, FiTool } from "react-icons/fi";
import { FaCalendar, FaTimes } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";
import campus from "../assets/uploads/campus.jpg";
import { useTranslation } from "react-i18next";
const Home = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const features = t("features");
  const home = t("home");
  console.log(features);
  const { isLoggedIn, isAdmin } = useAuth();
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const user_name = localStorage.getItem("user_name");
      if (location.state && location.state.action === "homelogin") {
        toast.success(`Welcome ${user_name}`);
      }
    }
    if (location.state && location.state.action === "homelogout") {
      toast.info("Logout Success");
    }
    return () => {
      location;
    };
  }, [location.state]);

  useEffect(() => {
    axios
      .get("http://localhost:8088/auth/up_events")
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (timestamp) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <ToastContainer
        hideProgressBar="true"
        position="top-center"
        pauseOnHover="false"
        pauseOnFocusLoss="false"
      />
      <header
        className="masthead"
        style={{
          backgroundImage: `url(${campus})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-lg-8  text-center">
              <h1 className="text-white font-weight-bold display-3 mb-4">
                {home["title"]}
              </h1>
              <p className="text-white-75 font-weight-bold lead mb-5">
                {home["description"]}
              </p>
              {!isAdmin && (
                <Link className="btn btn-primary btn-xl" to="about">
                  {home["button1"]}
                </Link>
              )}
              {!isLoggedIn && (
                <Link className="btn btn-info  ms-2   btn-xl" to="login">
                  {home["button2"]}
                </Link>
              )}
              {isLoggedIn && isAdmin && (
                <Link className="btn btn-primary btn-xl" to="dashboard">
                  {home["button3"]}
                </Link>
              )}
              {isLoggedIn && !isAdmin && (
                <Link className="btn btn-info  ms-2   btn-xl" to="account">
                  Profile
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className={`page-section bg-${theme}`} id="alumni-benefits">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">
              {features["title"]}
            </h2>
            <h3 className=" card-title text-muted">
              {features["description"]}
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 benefit-card">
                <div className="card-body text-center">
                  <FiClipboard size={40} className="mb-3 text-primary" />
                  <h4 className="card-title">{features["card1"]}</h4>
                  {/* <p className="card-text">
                    Get assistance with your career goals.
                  </p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 benefit-card">
                <div className="card-body text-center">
                  <FiBook size={40} className="mb-3 text-primary" />
                  <h4 className="card-title"> {features["card2"]}</h4>
                  {/* <p className="card-text">Access to the alumni library.</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 benefit-card">
                <div className="card-body text-center">
                  <FiTool size={40} className="mb-3 text-primary" />
                  <h4 className="card-title"> {features["card3"]}</h4>
                  {/* <p className="card-text">Access to sports facilities.</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 benefit-card">
                <div className="card-body text-center">
                  <FiUsers size={40} className="mb-3 text-primary  " />
                  <h4 className="card-title">{features["card4"]}</h4>
                  {/* <p className="card-text">Connect with fellow alumni.</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className={`py-4 bg-${theme}`} id="upcoming-events">
        <div className="container">
          <h2 className="section-heading text-center">Upcoming Events</h2>
          <hr className="divider my-4" />
          {events.length > 0 ? (
            <>
              {events.map((e, index) => (
                <div className="card event-list" key={index}>
                  <div className="banner">
                    <img src="" alt="" />
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center justify-content-center text-center h-100">
                      <div className="">
                        <h3>
                          <b className="filter-txt">{e.title}</b>
                        </h3>
                        <div>
                          <small>
                            <p>
                              <b>
                                <FaCalendar className="me-1 " />
                                {formatDate(e.schedule)}
                              </b>
                            </p>
                          </small>
                        </div>
                        <hr />
                        <p
                          className="truncate filter-txt"
                          dangerouslySetInnerHTML={{ __html: e.content }}
                        ></p>
                        <br />
                        <hr
                          className="divider"
                          style={{ maxWidth: "calc(80%)" }}
                        />
                        <button
                          className="btn btn-primary float-right read_more"
                          onClick={() =>
                            navigate("events/view", {
                              state: { action: "view", data: e },
                            })
                          }
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-info-emphasis">
                  No Upcoming Event Available
                </h4>
              </div>
            </>
          )}
        </div>
      </section> */}
    </div>
  );
};

export default Home;
