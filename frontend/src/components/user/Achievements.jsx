import React, { useState } from "react";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    approved: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAchievements([...achievements, formData]);
    setFormData({
      title: "",
      description: "",
      date: "",
      approved: false,
    });
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px", // Maintain consistent spacing between all input fields
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "5px",
  };

  const buttonStyle = {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  };

  const tableStyle = {
    width: "100%",
    marginTop: "30px",
    borderCollapse: "collapse",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const thStyle = {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Achievements</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        {/* <div style={formGroupStyle}>
          <label style={labelStyle}>
            Approved:
            <input
              type="checkbox"
              name="approved"
              checked={formData.approved}
              onChange={handleInputChange}
              style={{ marginLeft: "10px", transform: "scale(1.2)" }}
            />
          </label>
        </div> */}
        <button type="submit" style={buttonStyle}>
          Add Achievement
        </button>
      </form>

      <h2 style={{ marginTop: "40px", color: "#333", textAlign: "center" }}>
        Achievements List
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((achievement, index) => (
            <tr key={index}>
              <td style={tdStyle}>{achievement.title}</td>
              <td style={tdStyle}>{achievement.description}</td>
              <td style={tdStyle}>{achievement.date}</td>
              <td
                style={{
                  ...tdStyle,
                  color: achievement.approved ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {achievement.approved ? "Approved" : "Not Approved"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Achievements;
