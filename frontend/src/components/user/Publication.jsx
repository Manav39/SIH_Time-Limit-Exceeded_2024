import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../AuthContext";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  MenuItem
} from "@mui/material";

const Publications = () => {
  const [users, setUsers] = useState([]); // For storing the list of users
  const [publications, setPublications] = useState([]); // For storing the list of publications
  const [selectedAuthors, setSelectedAuthors] = useState([]); // For storing the selected authors' IDs
  const [values, setValues] = useState({
    title: "",
    date: "",
    description: "",
  });



  const { setDC, DC } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8088/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };




    const fetchPublications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8088/publications/allpublication"
        );
        setPublications(response.data);
      } catch (error) {
        console.error("Error fetching publications:", error);
        toast.error("Failed to fetch publications");
      }
    };

    fetchUsers();
    fetchPublications();
  }, []);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectAuthors = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedAuthors(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const publicationData = {
      ...values,
      authors: selectedAuthors,
      department: localStorage.getItem("dept"),
      status: "Pending", // Set initial status as Pending
    };

    try {
      const response = await axios.post(
        "http://localhost:8088/publications/addpublication",
        publicationData
      );
      toast.success(response.data.message);

      // Fetch updated publications after adding a new one
      setPublications([...publications, response.data.publication]);
    } catch (error) {
      console.error("Error submitting publication:", error);
      toast.error("Failed to submit publication");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8088/publications/deletepublication/${id}`
      );
      toast.warning(response.data.message);
      setPublications(publications.filter((pub) => pub._id !== id));
    } catch (error) {
      console.error("Error deleting publication:", error);
      toast.error("Failed to delete publication");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };

  const getStatusButton = (status) => {
    let buttonColor;
    switch (status) {
      case "approved":
        buttonColor = "success";
        break;
      case "rejected":
        buttonColor = "error";
        break;
      case "pending":
        buttonColor = "neutral";
        break;
      default:
        buttonColor = "default";
    }
    return (
      <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} color={buttonColor} size="small" />
    );
  };


  console.log("usersss", users);

  return (
    <Container>
      <ToastContainer position="top-center" />
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Card>
            <CardHeader title="Add Publications" />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  select
                  label="Authors"
                  name="authors"
                  SelectProps={{ multiple: true }}
                  value={selectedAuthors}
                  onChange={handleSelectAuthors}
                  margin="normal"
                  required
                  helperText="Select authors"
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Card>
            <CardHeader title="Publications List" />
            <CardContent>
              {publications.length > 0 ? (
                <List>
                  {publications.map((pub) => (
                    pub.status !== "Approved" && (
                      <ListItem key={pub._id} divider>
                        <ListItemText
                          primary={<Typography variant="body1"><b>Title:</b> {pub.title} | <b>Date:</b> {formatDate(pub.date)} | <b>Status:</b> {getStatusButton(pub.status)}</Typography>}
                          secondary={
                            <div>
                              <Typography variant="body2"><b>Description:</b> {pub.description}</Typography>
                              <Typography variant="body2"><b>Authors:</b> {pub.authors.join(", ")}</Typography>
                            </div>
                          }
                        />
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ ml: 2 }}
                          onClick={() => handleDelete(pub._id)}
                        >
                          Delete
                        </Button>
                      </ListItem>
                    )
                  ))}
                </List>
              ) : (
                <Typography>No publications found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Publications;
