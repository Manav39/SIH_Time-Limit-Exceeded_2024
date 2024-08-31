import React, { useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from "react-toastify";

const AnnualReport = () => {
  const [state] = useState({
    vision: 'To be a globally recognized institution for excellence in engineering education and research.',
    mission: 'To provide high-quality education and training to students, to foster innovation and research, and to contribute to societal development.',
    history: 'Founded in 1887, VJTI has been a leading institution in engineering education, known for its academic excellence and research initiatives.',
    boardOfDirectors: [
      { name: 'Dr. A. Sharma', position: 'Chairman' },
      { name: 'Dr. B. Patel', position: 'Director' },
      { name: 'Dr. CP. Adhik', position: 'CEO' },
    ],
    facultyRecord: [
      { name: 'Prof. C. Kumar', position: 'Computer Science' },
      { name: 'Prof. D. Singh', position: 'Electronics' }
    ],
    departments: [
      'Computer Science',
      'Electronics',
      'Mechanical Engineering'
    ],
    publications: [
      { title: 'Research on AI', author: 'Dr. E. Verma' },
      { title: 'Advances in Robotics', author: 'Prof. F. Jain' }
    ],
    events: [
      { title: 'Annual Tech Fest', date: 'March 15, 2024' },
      { title: 'Guest Lecture Series', date: 'June 10, 2024' }
    ]
  });

  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

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

  const createAndDownloadPdf = () => {
    toast.info("Downloading Report");
    axios.post('http://localhost:8088/create-pdf', state)
      .then(() => axios.get('http://localhost:8088/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'VJTI_REPORT.pdf');
        toast.success("Report Downloaded Successfully");
      })
  }

  return (
    <div style={styles.reportBox}>
      <ToastContainer position="top-center" />

      {/* Cover Page */}
      <div style={styles.section}>
        <div style={styles.heading}>
          <h1>VJTI Annual Report 2024</h1>
        </div>
        <img
          src="https://vjti.ac.in/wp-content/uploads/2024/06/vjti-maingate.png"
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
        <h2>Departments</h2>
        <table style={styles.table}>
          <tbody>
            {state.departments.map((department, index) => (
              <tr key={index}>
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
            </tr>
          </thead>
          <tbody>
            {state.publications.map((publication, index) => (
              <tr key={index}>
                <td style={styles.tableData}>{publication.title}</td>
                <td style={styles.tableData}>{publication.author}</td>
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

      
      {/* Footer */}
      <div style={styles.footer}>
        <p>© 2024 VJTI. All rights reserved.</p>
      </div>

      <br/>
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
};

export default AnnualReport;
