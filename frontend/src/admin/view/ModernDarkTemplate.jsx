import React, { useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from "react-toastify";

export const styles = {
    reportBox: {
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '40px',
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
        fontFamily: "'Roboto', sans-serif",
        lineHeight: '1.6',
    },
    coverPage: {
      position: 'relative',
      textAlign: 'center',
      color: '#ffffff',
      marginBottom: '60px',
    },
    coverImage: {
      width: '100%',
      height: '500px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    coverText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(30, 30, 47, 0.8)',
      padding: '20px 40px',
      borderRadius: '10px',
    },
    section: {
      marginBottom: '60px',
    },
    sectionTitle: {
      fontSize: '2em',
      fontFamily: "'Montserrat', sans-serif",
      borderBottom: '3px solid #00bfa6',
      paddingBottom: '10px',
      marginBottom: '30px',
      color: '#00bfa6',
    },
    text: {
      fontSize: '1.1em',
    },
    twoColumnGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    tableHeader: {
      backgroundColor: '#00bfa6',
      color: '#1e1e2f',
      textAlign: 'left',
      padding: '12px',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '1em',
    },
    tableRow: {
      backgroundColor: '#2e2e4d',
    },
    tableData: {
      padding: '12px',
      borderBottom: '1px solid #3e3e5e',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      borderTop: '1px solid #3e3e5e',
      marginTop: '60px',
      fontSize: '0.9em',
      color: '#bbbbbb',
    },
    downloadButton: {
      display: 'inline-block',
      padding: '15px 30px',
      backgroundColor: '#00bfa6',
      color: '#1e1e2f',
      textAlign: 'center',
      borderRadius: '5px',
      textDecoration: 'none',
      fontSize: '1em',
      fontFamily: "'Montserrat', sans-serif",
      cursor: 'pointer',
      marginTop: '30px',
    },
  };

const ModernDarkTemplate = ({ state, formattedDate, createAndDownloadPdf }) => (
  <div style={styles.reportBox}>
    <ToastContainer position="top-center" />

    {/* Cover Page */}
    <div style={styles.coverPage}>
      <img
        src="https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"
        alt="VJTI Cover"
        style={styles.coverImage}
      />
      <div style={styles.coverText}>
        <h1 style={{ fontSize: '3em', margin: '0' }}>VJTI Annual Report</h1>
        <p style={{ fontSize: '1.2em', marginTop: '10px' }}>Year: 2024</p>
        <p style={{ fontSize: '1em', marginTop: '5px' }}>Date: {formattedDate}</p>
      </div>
    </div>

    {/* Vision and Mission */}
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Vision & Mission</h2>
      <div style={styles.text}>
        <h3 style={{ color: '#ffaa00' }}>Our Vision</h3>
        <p>{state.vision}</p>
        <h3 style={{ color: '#ffaa00', marginTop: '20px' }}>Our Mission</h3>
        <p>{state.mission}</p>
      </div>
    </div>

    {/* History */}
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Our History</h2>
      <p style={styles.text}>{state.history}</p>
    </div>

    {/* Board of Directors and Faculty Records */}
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Our Team</h2>
      <div style={styles.twoColumnGrid}>
        {/* Board of Directors */}
        <div>
          <h3 style={{ color: '#ffaa00', marginBottom: '15px' }}>Board of Directors</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Position</th>
              </tr>
            </thead>
            <tbody>
              {state.boardOfDirectors.map((director, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableData}>{director.name}</td>
                  <td style={styles.tableData}>{director.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Faculty Records */}
        <div>
          <h3 style={{ color: '#ffaa00', marginBottom: '15px' }}>Faculty Records</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Department</th>
              </tr>
            </thead>
            <tbody>
              {state.facultyRecord.map((faculty, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableData}>{faculty.name}</td>
                  <td style={styles.tableData}>{faculty.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Departments */}
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Departments</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>#</th>
            <th style={styles.tableHeader}>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {state.departments.map((department, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableData}>{index + 1}</td>
              <td style={styles.tableData}>{department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Publications */}
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Publications</h2>
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
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableData}>{publication.title}</td>
              <td style={styles.tableData}>{publication.author}</td>
              <td style={styles.tableData}>
                <a href="#" style={{ color: '#00bfa6', textDecoration: 'none' }}>View Paper</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Events */}
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Events</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Event Name</th>
            <th style={styles.tableHeader}>Date</th>
          </tr>
        </thead>
        <tbody>
          {state.events.map((event, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableData}>{event.title}</td>
              <td style={styles.tableData}>{event.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Achievements */}
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Achievements</h2>
      <ul>
        {state.achievements.map((achievement, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {achievement}
          </li>
        ))}
      </ul>
    </div>

    {/* Footer */}
    <div style={styles.footer}>
      <p>&copy; 2024 Veermata Jijabai Technological Institute. All rights reserved.</p>
      <p>Address: H. R. Mahajani Marg, Matunga, Mumbai - 400019, India</p>
      <p>
        Website: <a href="https://vjti.ac.in" style={{ color: '#00bfa6', textDecoration: 'none' }}>www.vjti.ac.in</a>
      </p>
    </div>

    {/* Download Button */}
    <div style={{ textAlign: 'center' }}>
      <button style={styles.downloadButton} onClick={createAndDownloadPdf}>
        Download Report
      </button>
    </div>
  </div>
);

export default ModernDarkTemplate;
