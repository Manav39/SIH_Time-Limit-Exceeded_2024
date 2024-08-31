import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Faculties = () => {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8088/users") // Update endpoint for faculties
      .then((res) => setFaculties(res.data))
      .catch((err) => console.log(err));
  }, []);

  const delFaculty = (id) => {
    axios
      .delete(`http://localhost:8088/${id}`)
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        setFaculties(faculties.filter((f) => f.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (timestamp) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  const CutContent = (content, maxLength) => {
    const strippedContent = content.replace(/<[^>]+>/g, "");
    if (strippedContent.length > maxLength) {
      return strippedContent.substring(0, maxLength) + "...";
    }
    return strippedContent;
  };

  const handleView = (faculty) => {
    navigate("/faculties/view", { state: { action: "view", data: faculty } });
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <div className="col-lg-12">
        <div className="row mb-4 mt-4">
          <div className="col-md-12"></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b>List of Faculties</b>
                {/* <span className="float:right">
                  <Link
                    to={"/dashboard/faculties/manage"} // Update navigation link
                    className="btn btn-primary btn-block btn-sm col-sm-2 float-right"
                    id="new_faculty"
                  >
                    <FaPlus /> New Entry
                  </Link>
                </span> */}
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-condensed table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="">Name</th>
                        {/* <th className="">Department</th> */}
                        {/* <th className="">Designation</th> */}
                        <th className="">Email</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faculties.length > 0 ? (
                        <>
                          {faculties.map((faculty, index) => (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td>{faculty.name}</td>
                              {/* <td>{faculty.department}</td> */}
                              <td>{faculty.email}</td>
                              {/* <td>{faculty.emil}</td> */}
                              <td className="text-center justify-content-center border-0 d-flex gap-1">
                                {/* <button
                                  onClick={() => handleView(faculty)}
                                  className="btn btn-sm btn-outline-primary edit_career"
                                >
                                  View
                                </button> */}
                                <Link
                                  to="/dashboard/faculties/manage"
                                  state={{ status: "edit", data: faculty }}
                                  className="btn btn-sm btn-outline-primary"
                                  type="button"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => delFaculty(faculty.id)}
                                  className="btn btn-sm btn-outline-danger"
                                  type="button"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">
                            No Faculty Available
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

export default Faculties;
