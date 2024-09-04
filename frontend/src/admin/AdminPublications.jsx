import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AdminPublications = () => {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8088/publications/allpublication")
      .then((res) => {
        // Filter publications to show only those with status 'approved'
        const approvedPublications = res.data.filter(
          (pub) => pub.status === "approved"
        );
        setPublications(approvedPublications);
        setFilteredPublications(approvedPublications);
      })
      .catch((err) => console.log(err));
  }, []);

  const delPublication = (id) => {
    axios
      .delete(`http://localhost:8088/publications/deletepublication/${id}`)
      .then((res) => {
        toast.success("Publication deleted successfully");
        setPublications(publications.filter((p) => p._id !== id));
        setFilteredPublications(
          filteredPublications.filter((p) => p._id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting publication");
      });
  };

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const CutContent = (content, maxLength) => {
    const strippedContent = content.replace(/<[^>]+>/g, "");
    if (strippedContent.length > maxLength) {
      return strippedContent.substring(0, maxLength) + "...";
    }
    return strippedContent;
  };

  const handleView = (publication) => {
    navigate("/publications/view", {
      state: { action: "view", data: publication },
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = publications.filter(
      (publication) =>
        publication.title.toLowerCase().includes(value) ||
        publication.description.toLowerCase().includes(value)
    );
    setFilteredPublications(filtered);
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <div className="col-lg-12">
        <div className="row mb-4 mt-4">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title or Description"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b style={{ color: "#007BFF" }}>
                  List of Approved Publications
                </b>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-condensed table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPublications.length > 0 ? (
                        <>
                          {filteredPublications.map((publication, index) => (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td>{formatDate(publication.date)}</td>
                              <td>{publication.title}</td>
                              <td>{CutContent(publication.description, 50)}</td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            No Approved Publications Available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPublications;
