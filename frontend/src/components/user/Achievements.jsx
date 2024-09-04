import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [departments, setDepartments] = useState([]); // To store the list of departments
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    verificationLink: "",
  });
  const [departmentId, setDepartmentId] = useState(""); // To store the selected department ID
  const [userId, setUserId] = useState(""); // To store user ID

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get("http://localhost:8088/data-entries/all-data-entry");
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        toast.error("Failed to fetch achievements");
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8088/departments/alldepartment");
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast.error("Failed to fetch departments");
      }
    };

    // Retrieve user ID from local storage
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    fetchAchievements();
    fetchDepartments();
  }, []);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    setDepartmentId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.title || !formValues.description || !userId || !departmentId) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8088/data-entries/add-data-entry", {
        ...formValues,
        submittedBy: userId,
        department: departmentId,
      });
      setAchievements([...achievements, response.data]);
      toast.success("Achievement added successfully!");
      setFormValues({
        title: "",
        description: "",
        verificationLink: "",
      }); // Clear form
    } catch (error) {
      console.error("Error adding achievement:", error);
      toast.error("Failed to add achievement");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/data-entries/delete-data-entry/${id}`);
      setAchievements(achievements.filter((achievement) => achievement._id !== id));
      toast.success("Achievement deleted successfully!");
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast.error("Failed to delete achievement");
    }
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Add Achievement" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Verification Link"
              name="verificationLink"
              value={formValues.verificationLink}
              onChange={handleInputChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Department</InputLabel>
              <Select value={departmentId} onChange={handleDepartmentChange}>
                {departments &&
                  departments.map((department) => (
                    <MenuItem key={department._id} value={department._id}>
                      {department.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Save
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Achievements List" />
        <CardContent>
          {achievements.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Verification Link</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {achievements.map((achievement) => (
                    <TableRow key={achievement._id}>
                      <TableCell>{achievement.title}</TableCell>
                      <TableCell>{achievement.description}</TableCell>
                      <TableCell>{new Date(achievement.dateSubmitted).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {achievement.verificationLink ? (
                          <a href={achievement.verificationLink} target="_blank" rel="noopener noreferrer">
                            {achievement.verificationLink}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(achievement._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No achievements found.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Achievements;
