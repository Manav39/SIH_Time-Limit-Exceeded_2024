import React from "react";
import { FaUsers, FaBriefcase, FaRupeeSign } from "react-icons/fa";
import { IoCalendar, IoBookSharp } from "react-icons/io5";
import { MdForum } from "react-icons/md";

const InfoCard = ({ title, count, Icon, className }) => (
  <div className="col-xxl-4 col-xl-6">
    <div className={`card info-card ${className}`}>
      <div className="card-body">
        <h5
          className="card-title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h5>
        <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <Icon />
          </div>
          <div className="ps-3">
            <h6>{count}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DeptCoordDashboard = () => {
  // Static data
  const counts = {
    faculty: 25, // Example number of faculty members
    courses: 30, // Example number of courses
    events: 8, // Example number of upcoming events
    funding: 500000, // Example amount of funding received
    publications: 35, // Example number of research publications
    requests: 10, // Example number of pending requests
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        {localStorage.getItem("role")?.charAt(0).toUpperCase() +
          localStorage.getItem("role")?.slice(1)}{" "}
        Dashboard
      </h1>
      <section className="section dashboard custommargin p-3">
        <div className="row">
          <InfoCard
            title={`Courses <span>| Total</span>`}
            count={counts.courses}
            Icon={FaBriefcase}
            className="customers-card"
          />
          <InfoCard
            title={`Faculty <span>| Total</span>`}
            count={counts.faculty}
            Icon={FaUsers}
            className="sales-card"
          />
          <InfoCard
            title={`Events <span>| Total</span>`}
            count={counts.events}
            Icon={IoCalendar}
            className="revenue-card"
          />
          <InfoCard
            title={`Funding Received <span>| Total</span>`}
            count={counts.funding}
            Icon={FaRupeeSign}
            className="purple-card"
          />
          <InfoCard
            title={`Publications <span>| Total</span>`}
            count={counts.publications}
            Icon={IoBookSharp}
            className="customers-card"
          />
          <InfoCard
            title={`Pending Requests <span>| Total</span>`}
            count={counts.requests}
            Icon={MdForum}
            className="sales-card"
          />
        </div>
      </section>
    </div>
  );
};

export default DeptCoordDashboard;
