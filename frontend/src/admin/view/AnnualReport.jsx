import React, { useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from "react-toastify";

const AnnualReport = () => {
  const [state] = useState({
    vision: "To be a globally recognized leader in engineering education, setting benchmarks for academic excellence and research innovation. We aspire to shape future leaders who drive progress and address the world's complex challenges with cutting-edge solutions. Our commitment is to create a dynamic learning environment that fosters creativity, critical thinking, and societal impact. We aim to integrate sustainable practices and interdisciplinary approaches to prepare our students for the demands of a rapidly evolving world.",
    mission: "To provide an exceptional educational experience that combines rigorous academic training with practical, hands-on learning. We are dedicated to advancing knowledge through pioneering research and fostering a culture of curiosity and discovery. Our mission is to empower students with the skills, values, and ethical framework needed to excel in their careers and contribute positively to society. We strive to build strong industry and community partnerships that enhance our educational programs and support our mission of excellence and innovation.",
    history: "VJTI Mumbai, established in 1887 as the Victoria Jubilee Technical Institute, has been a trailblazer in India's engineering education, research, and training landscape. Following independence, it was instrumental in the establishment of prestigious institutions like the IITs and RECs, contributing significantly to the nation's technological advancement. In 1997, VJTI underwent a name change to Veermata Jijabai Technological Institute, in tribute to the mother of Chhatrapati Shivaji Maharaj.",
    boardOfDirectors: [
      { name: 'Dr. A. Sharma', position: 'Chairman' },
        { name: 'Dr. B. Patel', position: 'Director' },
        { name: 'Dr. CP. Adhik', position: 'CEO' },
        { name: 'Dr. M. Rathi', position: 'Vice Chairman' },
        { name: 'Dr. S. Rao', position: 'Director of Research' },
        { name: 'Dr. N. Kulkarni', position: 'Director of Finance' },
        { name: 'Dr. T. Singh', position: 'Director of Administration' },
        { name: 'Dr. L. Mehta', position: 'Director of Outreach' },
        { name: 'Dr. J. Rao', position: 'Chief Academic Officer' },
        { name: 'Dr. P. Naik', position: 'Chief Operations Officer' },
        { name: 'Dr. Q. Kumar', position: 'Chief Technology Officer' },
        { name: 'Dr. V. Sinha', position: 'Director of Student Affairs' },
        { name: 'Dr. R. Verma', position: 'Director of Alumni Relations' },
        { name: 'Dr. G. Patel', position: 'Director of International Relations' },
    ],
    facultyRecord: [
      { name: 'Prof. C. Kumar', position: 'Computer Science' },
        { name: 'Prof. D. Singh', position: 'Electronics' },
        { name: 'Prof. R. Gupta', position: 'Mechanical Engineering' },
        { name: 'Prof. S. Patel', position: 'Civil Engineering' },
        { name: 'Prof. A. Verma', position: 'Chemical Engineering' },
        { name: 'Prof. T. Sharma', position: 'Electrical Engineering' },
        { name: 'Prof. M. Singh', position: 'Engineering Physics' },
        { name: 'Prof. N. Desai', position: 'Engineering Mathematics' },
        { name: 'Prof. O. Gupta', position: 'Engineering Chemistry' },
        { name: 'Prof. P. Kumar', position: 'Information Technology' },
        { name: 'Prof. R. Patel', position: 'Production Engineering' },
        { name: 'Prof. V. Sharma', position: 'Engineering Design' },
        { name: 'Prof. W. Rao', position: 'Data Science' }
    ],
    departments: [
      'Computer Science',
        'Electronics',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering',
        'Information Technology',
        'Production Engineering',
        'Engineering Design',
        'Data Science'
    ],
    publications: [
      { title: 'Research on AI', author: 'Dr. E. Verma' },
        { title: 'Advances in Robotics', author: 'Prof. F. Jain' },
        { title: 'Innovations in Data Science', author: 'Prof. A. Kumar' },
        { title: 'Machine Learning Techniques', author: 'Dr. B. Singh' },
        { title: 'Robotics and Automation', author: 'Prof. C. Patel' },
        { title: 'Advanced Thermal Engineering', author: 'Dr. D. Mehta' },
        { title: 'Structural Analysis and Design', author: 'Prof. E. Shah' },
        { title: 'Computational Fluid Dynamics', author: 'Dr. F. Rao' },
        { title: 'Bioengineering Breakthroughs', author: 'Prof. G. Yadav' },
        { title: 'Modern Chemical Processes', author: 'Dr. H. Patel' },
        { title: 'Electronic Circuit Design', author: 'Prof. I. Verma' },
        { title: 'Advanced Software Engineering', author: 'Dr. J. Sharma' },
        { title: 'Civil Engineering Innovations', author: 'Prof. K. Gupta' },
        { title: 'Engineering Mathematics Advances', author: 'Dr. L. Desai' },
        { title: 'Energy Systems and Management', author: 'Prof. M. Shah' },
        { title: 'Artificial Intelligence Applications', author: 'Dr. N. Jain' },
        { title: 'Mechanical Engineering Fundamentals', author: 'Prof. O. Kumar' },
        { title: 'Environmental Impact Assessments', author: 'Dr. P. Rao' },
        { title: 'Marine Engineering Technologies', author: 'Prof. Q. Nair' },
        { title: 'Aerospace Systems and Design', author: 'Dr. R. Patel' }
    ],
    events: [
      { title: 'Annual Tech Fest', date: 'March 15, 2024' },
      { title: 'Guest Lecture Series', date: 'June 10, 2024' },
      { title: 'Inter-college Robotics Competition', date: 'April 20, 2024' },
      { title: 'National Engineering Conference', date: 'July 15, 2024' },
      { title: 'Student Innovation Showcase', date: 'August 5, 2024' },
      { title: 'Alumni Meet', date: 'September 22, 2024' },
      { title: 'Engineering Workshop Week', date: 'October 10-14, 2024' },
      { title: 'Annual Sports Day', date: 'November 3, 2024' },
      { title: 'Cultural Fest', date: 'December 15, 2024' },
      { title: 'International Guest Speaker Series', date: 'January 25, 2024' },
      { title: 'Research Symposium', date: 'February 18, 2024' },
      { title: 'Career Fair', date: 'March 30, 2024' },
      { title: 'Summer Internship Program', date: 'May 1, 2024' },
      { title: 'Science and Engineering Fair', date: 'June 5, 2024' },
      { title: 'Design Thinking Workshop', date: 'July 12, 2024' },
      { title: 'Technology Transfer Seminar', date: 'August 25, 2024' },
      { title: 'Engineering Design Contest', date: 'September 10, 2024' },
      { title: 'Health and Wellness Week', date: 'October 1-7, 2024' },
      { title: 'International Engineering Day', date: 'November 20, 2024' },
      { title: 'Research and Development Expo', date: 'December 22, 2024' }
    ],
    achievements: [
      "VJTI secured the 150 - 200 position in the National Institutional Ranking Framework (NIRF) 2024.",
      "Our Computer Science and Engineering program received reaccreditation from the National Board of Accreditation (NBA).",
      "Awarded ₹5 crore in research grants from the Department of Science and Technology (DST) for innovative research in Artificial Intelligence.",
      "Filed 3 patents for new technologies developed in our Robotics and Mechanical Engineering departments.",
      "Our team won the first prize in the RoboMasters Competition 2024 held in China and secured top positions in the Smart India Hackathon.",
      "Completed the construction of the new Innovation Hub, featuring state-of-the-art laboratories and collaborative spaces.",
      "Achieved a 90% placement rate for the graduating class of 2024, with notable recruiters including JPMC, Citi, Microsoft, Google"
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
};

export default AnnualReport;
