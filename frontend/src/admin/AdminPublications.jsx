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
        setPublications(res.data);
        setFilteredPublications(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getAuthorName = async(id) => {
    let name = "";
    axios
      .get(`http://localhost:8088/${id}`)
      .then((res) => {
        name = res.data.user.name;
      })
      .catch((err) => {
        console.log(err);
      });

      return name;
  }

  const delPublication = (id) => {
    axios
      .delete(`http://localhost:8088/publications/deletepublication/${id}`)
      .then((res) => {
        toast.success("Publication deleted successfully");
        setPublications(publications.filter((p) => p._id !== id));
        setFilteredPublications(filteredPublications.filter((p) => p._id !== id));
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
    navigate("/publications/view", { state: { action: "view", data: publication } });
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
                <b style={{ color: "#007BFF" }}>List of Publications</b>
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
                        {/* <th className="text-center">Authors</th> */}
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
                              {/* <td className="text-center">
                                {publication.authors && publication.authors.length > 0 ? (
                                  publication.authors.map((author, i) => (
                                    <span key={i}>
                                      {getAuthorName(author)}{i < publication.authors.length - 1 ? ", " : ""}
                                    </span>
                                  ))
                                ) : (
                                  <span>No Authors</span>
                                )}
                              </td> */}
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            No Publications Available
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
