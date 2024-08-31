import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [stateCS] = useState({
    vision: 'To be a globally recognized institution for excellence in engineering education and research.',
    mission: 'To provide high-quality education and training to students, to foster innovation and research, and to contribute to societal development.',
    history: 'Founded in 1887, VJTI has been a leading institution in engineering education, known for its academic excellence and research initiatives.',
    boardOfDirectors: [
      { name: 'Dr. A. Sharma', position: 'Chairman' },
      { name: 'Dr. B. Patel', position: 'Director' },
      { name: 'Dr. CP. Adhik', position: 'CEO' },
    ],
    facultyRecord: [
      { name: 'Prof. C. Kumar', position: 'Computer Science' },
      { name: 'Prof. D. Singh', position: 'Electronics' }
    ],
    departments: [
      'Computer Science',
      'Electronics',
      'Mechanical Engineering'
    ],
    publications: [
      { title: 'Research on AI', author: 'Dr. E. Verma' },
      { title: 'Advances in Robotics', author: 'Prof. F. Jain' }
    ],
    events: [
      { title: 'Annual Tech Fest', date: 'March 15, 2024' },
      { title: 'Guest Lecture Series', date: 'June 10, 2024' }
    ]
  });

  useEffect(() => {
    axios
      .get("http://localhost:8088/departments/alldepartment")
      .then((res) => {
        console.log(res.data.departments);
        setDepartments(res.data.departments);
        setFilteredDepartments(res.data.departments);
      })
      .catch((err) => console.log(err));
  }, []);

  const delDepartment = (id) => {
    axios
      .delete(`http://localhost:8088/departments/deletedepartment/${id}`)
      .then((res) => {
        toast.success("Department deleted successfully");
        setDepartments(departments.filter((d) => d._id !== id));
        setFilteredDepartments(filteredDepartments.filter((d) => d._id !== id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting department");
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = departments.filter(
      (department) =>
        department.name.toLowerCase().includes(value) ||
        department.hod.toLowerCase().includes(value) ||
        department.department_coordinator.toLowerCase().includes(value)
    );
    setFilteredDepartments(filtered);
  };

  const downloadReport = (departmentName) => {
    return () => {
      if(departmentName === "Computer Science") {
        toast.info("Downloading Report");
        axios.post('http://localhost:8088/create-pdf-cs', stateCS)
        .then(() => axios.get('http://localhost:8088/fetch-pdf-cs', { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          saveAs(pdfBlob, 'VJTI_REPORT_CS.pdf');
          toast.success("Report Downloaded Successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error downloading report");
        });
      }
    };
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
              placeholder="Search by Name, HoD, or Coordinator"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b style={{ color: "#007BFF" }}>List of Departments</b>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-condensed table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Name</th>
                        <th>HoD</th>
                        <th>Coordinator</th>
                        <th>Year Wise Intake</th>
                        <th>Report</th>
                        {/* <th className="text-center">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDepartments.length > 0 ? (
                        <>
                          {filteredDepartments.map((department, index) => (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td>{department.name}</td>
                              <td>{department.hod}</td>
                              <td>{department.department_coordinator}</td>
                              <td>{department.year_wise_intake}</td>
                              <td className="text-center justify-content-center border-0 d-flex gap-1">
                                <button
                                  onClick={downloadReport(department.name)}
                                  className="btn btn-sm btn-outline-primary edit_career"
                                >
                                  Download Report
                                </button>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">
                            No Departments Available
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

export default AdminDepartments;
