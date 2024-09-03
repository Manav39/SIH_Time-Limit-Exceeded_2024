import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    approved: false,
    verificationUrl: "", // New field
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
      verificationUrl: "", // Reset new field
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Achievements
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="Verification Document URL"
          name="verificationUrl"
          value={formData.verificationUrl}
          onChange={handleInputChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Add Achievement
        </Button>
      </form>

      <Typography variant="h5" align="center" gutterBottom>
        Achievements List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Verification Document</TableCell> {/* New column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {achievements.map((achievement, index) => (
              <TableRow key={index}>
                <TableCell>{achievement.title}</TableCell>
                <TableCell>{achievement.description}</TableCell>
                <TableCell>{achievement.date}</TableCell>
                <TableCell style={{ color: achievement.approved ? "green" : "red", fontWeight: "bold" }}>
                  {achievement.approved ? "Approved" : "Not Approved"}
                </TableCell>
                <TableCell>
                  {achievement.verificationUrl ? (
                    <Link href={achievement.verificationUrl} target="_blank" rel="noopener">
                      View Document
                    </Link>
                  ) : (
                    "No Document"
                  )}
                </TableCell> {/* New cell */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Achievements;
