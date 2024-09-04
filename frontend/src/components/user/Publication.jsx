import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const Publications = () => {
  const [users, setUsers] = useState([]); // For storing the list of users
  const [publications, setPublications] = useState([]); // For storing the list of publications
  const [selectedAuthors, setSelectedAuthors] = useState([]); // For storing the selected authors' IDs
  const [values, setValues] = useState({
    title: "",
    date: "",
    description: "",
    url: "", // Add URL field
  });

  const { t } = useTranslation();
  const pub = t("user");

  // Get the current user ID from localStorage
  const currentUserId = localStorage.getItem("userId");

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
        const allPublications = response.data;

        console.log("Fetched publications:", allPublications);

        // Filter publications to show only those where the current user is an author
        const userPublications = allPublications.filter((pub) =>
          pub.authors.includes(currentUserId)
        );

        setPublications(userPublications);
      } catch (error) {
        console.error("Error fetching publications:", error);
        toast.error("Failed to fetch publications");
      }
    };

    fetchUsers();
    fetchPublications();
  }, [currentUserId]);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectAuthors = (e) => {
    setSelectedAuthors(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const publicationData = {
      ...values,
      authors: selectedAuthors,
      status: "Pending", // Set initial status as Pending
    };

    try {
      const response = await axios.post(
        "http://localhost:8088/publications/addpublication",
        publicationData
      );
      console.log(publicationData);
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
    return date.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
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
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={buttonColor}
        size="small"
      />
    );
  };

  // Helper function to get author names by their IDs
  const getAuthorNames = (authorIds) => {
    return authorIds
      .map((id) => {
        const user = users.find((user) => user._id === id);
        return user ? user.name : "Unknown";
      })
      .join(", ");
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Card>
            <CardHeader title={pub["addpub"]} />
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
                <TextField
                  fullWidth
                  label="URL"
                  name="url"
                  value={values.url}
                  onChange={handleInputChange}
                  margin="normal"
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
            <CardHeader title={pub["publist"]} />
            <CardContent>
              {publications.length > 0 ? (
                <List>
                  {publications.map(
                    (pub) =>
                      pub.status !== "Approved" && (
                        <ListItem key={pub._id} divider>
                          <ListItemText
                            primary={
                              <Typography variant="body1">
                                <b>Title:</b> {pub.title} | <b>Date:</b>{" "}
                                {formatDate(pub.date)} | <b>Status:</b>{" "}
                                {getStatusButton(pub.status)}
                              </Typography>
                            }
                            secondary={
                              <div>
                                <Typography variant="body2">
                                  <b>Description:</b> {pub.description}
                                </Typography>
                                <Typography variant="body2">
                                  <b>Authors:</b> {getAuthorNames(pub.authors)}
                                </Typography>
                                {pub.url && (
                                  <Typography variant="body2">
                                    <b>URL:</b>{" "}
                                    <a
                                      href={pub.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {pub.url}
                                    </a>
                                  </Typography>
                                )}
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
                  )}
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
