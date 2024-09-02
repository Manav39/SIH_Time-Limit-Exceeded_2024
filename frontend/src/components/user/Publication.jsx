import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../AuthContext";

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
    // Fetch the list of users from the /users endpoint
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8088/users");
        setUsers(response.data); // Assuming response.data is an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };

    // Fetch all publications
    const fetchPublications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8088/publications/allpublication"
        );
        setPublications(response.data); // Assuming response.data is an array of publications
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
    };

    try {
      const response = await axios.post(
        "http://localhost:8088/publications/addpublication",
        publicationData
      );
      toast.success(response.data.message);

      // Fetch updated publications after adding a new one
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

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <div className="col-lg-12">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-header">Add Publications</div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="control-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={values.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={values.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Authors</label>
                    <select
                      multiple
                      className="form-control"
                      name="authors"
                      value={selectedAuthors}
                      onChange={handleSelectAuthors}
                      required
                    >
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={values.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        className="btn btn-sm btn-primary btn-block"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <b>Publications List</b>
              </div>
              <div className="card-body">
                <table
                  className="table table-bordered table-hover"
                  style={{ width: "100" }}
                >
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Title</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">Description</th>
                      <th className="text-center">Authors</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publications.map((pub, index) => (
                      <tr key={pub._id}>
                        <td className="text-center">{index + 1}</td>
                        <td>{pub.title}</td>
                        <td className="text-center">{pub.date}</td>
                        <td>{pub.description}</td>
                        <td>
                          {pub.authors.join(", ")}{" "}
                          {/* Display author IDs or names */}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-danger delete_gallery"
                            type="button"
                            onClick={() => handleDelete(pub._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publications;
