import React, { useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from "react-toastify";

const styles = {
    reportBox: {
        maxWidth: "210mm",  // A4 size width
        margin: "20px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Arial', sans-serif",
        color: "#333",
    },
    heading: {
      background: "#007BFF",
      color: "white",
      padding: "10px",
      textAlign: "center",
      borderRadius: "5px",
      fontSize: "24px",
    },
    titleImage: {
      width: "100%",
      borderRadius: "10px",
      margin: "20px 0",
    },
    section: {
      marginBottom: "30px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    tableHeader: {
      backgroundColor: "#007BFF",
      color: "white",
      padding: "10px",
      fontSize: "16px",
    },
    tableData: {
      padding: "10px",
      fontSize: "14px",
      borderBottom: "1px solid #ddd",
    },
    pageBreak: {
      pageBreakAfter: "always",
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
      fontSize: "14px",
      color: "#777",
    },
    button: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      display: "block",
      margin: "30px auto",
      width: "100%",
    },
  };

const ClassicTemplate = ({ state, formattedDate, createAndDownloadPdf }) => (
    <div style={styles.reportBox}>
    <ToastContainer position="top-center" />

    {/* Cover Page */}
    <div style={styles.section}>
      <div style={styles.heading}>
        <h1>VJTI Annual Report 2024</h1>
      </div>
      <img
        src="https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"
        alt="VJTI Image"
        style={styles.titleImage}
      />
      <p style={{ textAlign: "center", fontSize: "18px" }}><strong>Date:</strong> {formattedDate}</p>
    </div>

    {/* Vision, Mission, History */}
    <div style={styles.section}>
      <h2 style={styles.heading}>Vision</h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{state.vision}</p>
    </div>

    <div style={styles.section}>
      <h2 style={styles.heading}>Mission</h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{state.mission}</p>
    </div>

    <div style={styles.section}>
      <h2 style={styles.heading}>History</h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{state.history}</p>
    </div>

    <div style={styles.pageBreak}></div>
    <br/>
    <br/>

    {/* Board of Directors */}
    <div style={styles.section}>
      <img
        src="https://vjti.ac.in/wp-content/uploads/2024/07/sachin-kore-sir-768x512.png"
        alt="VJTI Image"
        style={styles.titleImage}
      />
      <br/>
      <h2>Board of Directors</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Position</th>
          </tr>
        </thead>
        <tbody>
          {state.boardOfDirectors.map((director, index) => (
            <tr key={index}>
              <td style={styles.tableData}>{director.name}</td>
              <td style={styles.tableData}>{director.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.pageBreak}></div>
    <br/>
    <br/>

    {/* Faculty Records */}
    <div style={styles.section}>
      <h2>Faculty Records</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Department</th>
          </tr>
        </thead>
        <tbody>
          {state.facultyRecord.map((faculty, index) => (
            <tr key={index}>
              <td style={styles.tableData}>{faculty.name}</td>
              <td style={styles.tableData}>{faculty.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.pageBreak}></div>
    <br/>
    <br/>

    {/* Departments */}
    <div style={styles.section}>
    <img
        src="https://vjti.ac.in/wp-content/uploads/elementor/thumbs/vjti-old-qquq2knh6gepn33yplkvt74bt6dtqadl87ab55ky9w.png"
        alt="VJTI Image"
        style={styles.titleImage}
      />
      <br/>
      <h2 style={styles.tableHeader}>Departments</h2>
      <table style={styles.table}>
        <tbody>
          {state.departments.map((department, index) => (
            <tr key={index}>
              <td >{index + 1}</td>
              <td style={styles.tableData}>{department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.pageBreak}></div>
    <br/>
    <br/>

    {/* Publications */}
    <div style={styles.section}>
      <h2>Publications</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Title</th>
            <th style={styles.tableHeader}>Author</th>
            <th style={styles.tableHeader}>Link</th>
          </tr>
        </thead>
        <tbody>
          {state.publications.map((publication, index) => (
            <tr key={index}>
              <td style={styles.tableData}>{publication.title}</td>
              <td style={styles.tableData}>{publication.author}</td>
              <td style={styles.tableData}><a href="">Paper</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.pageBreak}></div>
    <br/>
    <br/>

    {/* Events */}
    <div style={styles.section}>
      <h2>Events</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Event</th>
            <th style={styles.tableHeader}>Date</th>
          </tr>
        </thead>
        <tbody>
          {state.events.map((event, index) => (
            <tr key={index}>
              <td style={styles.tableData}>{event.title}</td>
              <td style={styles.tableData}>{event.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.pageBreak}></div>
    <br/>
    <br/>

    {/* Achievements */}
    <div style={styles.section}>
    <img
        src="https://vjti.ac.in/wp-content/uploads/elementor/thumbs/vjti-first-qquq2knh6gepn33yplkvt74bt6dtqadl87ab55ky9w.png"
        alt="VJTI Image"
        style={styles.titleImage}
      />
      <h2 style={styles.tableHeader}>Achievements</h2>
      <table style={styles.table}>
        <tbody>
          {state.achievements.map((achievement, index) => (
            <tr key={index}>
              <td >{index + 1}</td>
              <td style={styles.tableData}>{achievement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.pageBreak}></div>
    <br/>
    <br/>

    {/* Student Achievements */}
    <div style={styles.section}>
    <img
        src="https://vjti.ac.in/wp-content/uploads/elementor/thumbs/Hackathon-1-qquq2jpq5n7fxjoof62q2mk3fkefxsnqxvoz4bpeq2.png"
        alt="MCA Hackathon winners"
        style={styles.titleImage}
      />
      <h2 style={styles.heading}>Student Achievements</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>#</th>
            <th style={styles.tableHeader}>Student Name</th>
            <th style={styles.tableHeader}>Achievement</th>
          </tr>
        </thead>
        <tbody>
          {state.studentAchievements.map((achievement, index) => (
            <tr key={index}>
              <td style={styles.tableData}>{index + 1}</td>
              <td style={styles.tableData}>{achievement.name}</td>
              <td style={styles.tableData}>{achievement.achievement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={styles.pageBreak}></div>
    <br/>
    <br/>

    {/* Extracurricular Activities */}
    <div style={styles.section}>
    <img
        src="https://vjti.ac.in/wp-content/uploads/elementor/thumbs/pratibimb-featuredimg-qquq2oespxrrlh7cadjp3cttdoq6ouri90ls4mv4z8.png"
        alt="Pratibimb"
        style={styles.titleImage}
      />
      <h2 style={styles.heading}>Extracurricular Activities</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>#</th>
            <th style={styles.tableHeader}>Activity</th>
            <th style={styles.tableHeader}>Student Name</th>
            <th style={styles.tableHeader}>Description</th>
          </tr>
        </thead>
        <tbody>
          {state.extracurriculars.map((activity, index) => (
            <tr key={index}>
              <td style={styles.tableData}>{index + 1}</td>
              <td style={styles.tableData}>{activity.activity}</td>
              <td style={styles.tableData}>{activity.student}</td>
              <td style={styles.tableData}>{activity.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Footer */}
    <div style={styles.footer}>
      <p>&copy; 2024 VJTI. All rights reserved.</p>
      <p>Address: VJTI, Mumbai, India</p>
      <p>Website: <a href="https://vjti.ac.in" target="_blank">vjti.ac.in</a></p>
    </div>

    <br/>
    <br/>

    {/* Save Button */}
    <button
      style={styles.button}
      onClick={createAndDownloadPdf}
    >
      Download Report
    </button>
  </div>
);

export default ClassicTemplate;
