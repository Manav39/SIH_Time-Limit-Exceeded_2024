import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const DeptAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [users, setUsers] = useState([]);

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

    const fetchDeptAchievements = async () => {
      try {
        const deptId = localStorage.getItem("dept");
        const response = await axios.get(
          "http://localhost:8088/data-entries/all-data-entry"
        );

        // Filter achievements by department and type
        const deptAchievements = response.data.filter(
          (achievement) =>
            achievement.department === deptId &&
            achievement.type === "achievements"
        );

        setAchievements(deptAchievements);
      } catch (error) {
        console.error("Error fetching department achievements:", error);
        toast.error("Failed to fetch department achievements");
      }
    };

    fetchUsers();
    fetchDeptAchievements();
  }, []);

  const getAuthorNames = (authorId) => {
    if (typeof authorId === "string") {
      const user = users.find((user) => String(user._id) === authorId.trim());
      return user ? user.name : "Unknown";
    } else {
      console.error("authorId is not a string:", authorId);
      return "Unknown";
    }
  };

  const handleApproval = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8088/data-entries/update-data-entry/${id}`,
        {
          status: "approved",
        }
      );
      setAchievements(
        achievements.map((achievement) =>
          achievement._id === id
            ? { ...achievement, status: "approved" }
            : achievement
        )
      );
      toast.success("Achievement approved successfully!");
    } catch (error) {
      console.error("Error approving achievement:", error);
      toast.error("Failed to approve achievement");
    }
  };

  const handleRejection = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8088/data-entries/update-data-entry/${id}`,
        {
          status: "rejected",
        }
      );
      setAchievements(
        achievements.map((achievement) =>
          achievement._id === id
            ? { ...achievement, status: "rejected" }
            : achievement
        )
      );
      toast.success("Achievement rejected successfully!");
    } catch (error) {
      console.error("Error rejecting achievement:", error);
      toast.error("Failed to reject achievement");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return { backgroundColor: "#d4edda", color: "#155724" }; // Light green background for approved
      case "rejected":
        return { backgroundColor: "#f8d7da", color: "#721c24" }; // Light red background for rejected
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <ToastContainer position="top-center" />
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Department Achievements
      </h2>
      {achievements.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Verification Link</TableCell>
                <TableCell>Submitted By</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {achievements.map((achievement) => (
                <TableRow key={achievement._id}>
                  <TableCell>{achievement.title}</TableCell>
                  <TableCell>{achievement.description}</TableCell>
                  <TableCell>
                    {achievement.verificationLink ? (
                      <a
                        href={achievement.verificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007BFF", textDecoration: "none" }}
                      >
                        Verify
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {getAuthorNames(achievement.submittedBy)}
                  </TableCell>
                  <TableCell style={getStatusStyle(achievement.status)}>
                    {achievement.status}
                  </TableCell>
                  <TableCell>
                    {achievement.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleApproval(achievement._id)}
                          style={{
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRejection(achievement._id)}
                          style={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No achievements found for your department.
        </p>
      )}
    </div>
  );
};

export default DeptAchievements;
