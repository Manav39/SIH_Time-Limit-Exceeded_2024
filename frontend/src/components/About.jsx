import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../assets/uploads/logo.png";

const About = () => {
  const [system, setSystem] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8088/auth/settings")
      .then((res) => {
        setSystem(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <header className="masthead">
        <div className="container">
          <div className="row mt-5  h-100 align-items-center justify-content-center text-center">
            <div
              className="col-lg-10 align-self-end mb-4"
              style={{
                background: "#0000002e",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <h2 className="text-uppercase text-white font-weight-bold">
                About Us
              </h2>
              <hr className="divider my-4" />
              <p className="text-white-75 text-light mb-5">
              The platform's features—including user authentication, achievement submission, review workflows, notifications, and automatic reporting—are well-aligned with operational requirements, effectively enhancing the management of educational records.
              Efficiently manages educational records through a unified platform with streamlined submission, review, and reporting processes.
              Generates reports with real-time data integration, reducing manual effort and enhancing accuracy.
              
              </p>
            </div>
          </div>
        </div>
      </header>

      {system.length > 0 && (
        <section className="page-section">
          <div className="container">
            <h2 className="text-center">{system[0].name}</h2>
            <br />
            <p
              dangerouslySetInnerHTML={{ __html: system[0].about_content }}
            ></p>
          </div>
        </section>
      )}
    </>
  );
};

export default About;
