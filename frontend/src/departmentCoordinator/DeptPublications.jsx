import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
} from "@mui/material";

const DeptPublications = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
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

    fetchPublications();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8088/publications/updatepublication/${id}`,
        { status: "approved" }
      );
      toast.success(response.data.message);
      setPublications((prevPublications) =>
        prevPublications.map((pub) =>
          pub._id === id ? { ...pub, status: "approved" } : pub
        )
      );
    } catch (error) {
      console.error("Error approving publication:", error);
      toast.error("Failed to approve publication");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8088/publications/updatepublication/${id}`,
        { status: "rejected" }
      );
      toast.warning(response.data.message);
      setPublications((prevPublications) =>
        prevPublications.map((pub) =>
          pub._id === id ? { ...pub, status: "rejected" } : pub
        )
      );
    } catch (error) {
      console.error("Error rejecting publication:", error);
      toast.error("Failed to reject publication");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
  };

  const getStatusChip = (status) => {
    let color;
    switch (status) {
      case "approved":
        color = "success";
        break;
      case "rejected":
        color = "error";
        break;
      case "pending":
        color = "warning";
        break;
      default:
        color = "default";
    }
    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={color}
      />
    );
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Card>
            <CardHeader title="Publications List" />
            <CardContent>
              {publications.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publications.map((pub) => (
                      <tr key={pub._id}>
                        <td>{pub.title}</td>
                        <td>{formatDate(pub.date)}</td>
                        <td>{pub.description}</td>
                        <td>{getStatusChip(pub.status)}</td>
                        <td>
                          {pub.status === "pending" && (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleApprove(pub._id)}
                                sx={{ mr: 1 }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleReject(pub._id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default DeptPublications;
