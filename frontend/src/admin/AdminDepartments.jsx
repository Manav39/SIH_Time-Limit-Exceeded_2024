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
    vision: "To be a globally recognized leader in engineering education, setting benchmarks for academic excellence and research innovation. We aspire to shape future leaders who drive progress and address the world's complex challenges with cutting-edge solutions. Our commitment is to create a dynamic learning environment that fosters creativity, critical thinking, and societal impact. We aim to integrate sustainable practices and interdisciplinary approaches to prepare our students for the demands of a rapidly evolving world.",
    mission: "To provide an exceptional educational experience that combines rigorous academic training with practical, hands-on learning. We are dedicated to advancing knowledge through pioneering research and fostering a culture of curiosity and discovery. Our mission is to empower students with the skills, values, and ethical framework needed to excel in their careers and contribute positively to society. We strive to build strong industry and community partnerships that enhance our educational programs and support our mission of excellence and innovation.",
    history: "VJTI Mumbai, established in 1887 as the Victoria Jubilee Technical Institute, has been a trailblazer in India's engineering education, research, and training landscape. Following independence, it was instrumental in the establishment of prestigious institutions like the IITs and RECs, contributing significantly to the nation's technological advancement. In 1997, VJTI underwent a name change to Veermata Jijabai Technological Institute, in tribute to the mother of Chhatrapati Shivaji Maharaj.",
    boardOfDirectors: [
      { name: 'Dr. A. Sharma', position: 'Chairman' },
        { name: 'Dr. B. Patel', position: 'Director' },
        { name: 'Dr. CP. Adhik', position: 'CEO' },
        { name: 'Dr. M. Rathi', position: 'Vice Chairman' },
        { name: 'Dr. S. Rao', position: 'Director of Research' },
        { name: 'Dr. N. Kulkarni', position: 'Director of Finance' },
        { name: 'Dr. T. Singh', position: 'Director of Administration' },
        { name: 'Dr. L. Mehta', position: 'Director of Outreach' },
        { name: 'Dr. J. Rao', position: 'Chief Academic Officer' },
        { name: 'Dr. P. Naik', position: 'Chief Operations Officer' },
        { name: 'Dr. Q. Kumar', position: 'Chief Technology Officer' },
        { name: 'Dr. V. Sinha', position: 'Director of Student Affairs' },
        { name: 'Dr. R. Verma', position: 'Director of Alumni Relations' },
        { name: 'Dr. G. Patel', position: 'Director of International Relations' },
    ],
    facultyRecord: [
      { name: 'Prof. C. Kumar', position: 'Computer Science' },
        { name: 'Prof. D. Singh', position: 'Electronics' },
        { name: 'Prof. R. Gupta', position: 'Mechanical Engineering' },
        { name: 'Prof. S. Patel', position: 'Civil Engineering' },
        { name: 'Prof. A. Verma', position: 'Chemical Engineering' },
        { name: 'Prof. T. Sharma', position: 'Electrical Engineering' },
        { name: 'Prof. M. Singh', position: 'Engineering Physics' },
        { name: 'Prof. N. Desai', position: 'Engineering Mathematics' },
        { name: 'Prof. O. Gupta', position: 'Engineering Chemistry' },
        { name: 'Prof. P. Kumar', position: 'Information Technology' },
        { name: 'Prof. R. Patel', position: 'Production Engineering' },
        { name: 'Prof. V. Sharma', position: 'Engineering Design' },
        { name: 'Prof. W. Rao', position: 'Data Science' }
    ],
    departments: [
      'Computer Science',
        'Electronics',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering',
        'Information Technology',
        'Production Engineering',
        'Engineering Design',
        'Data Science'
    ],
    publications: [
      { title: 'Research on AI', author: 'Dr. E. Verma' },
        { title: 'Advances in Robotics', author: 'Prof. F. Jain' },
        { title: 'Innovations in Data Science', author: 'Prof. A. Kumar' },
        { title: 'Machine Learning Techniques', author: 'Dr. B. Singh' },
        { title: 'Robotics and Automation', author: 'Prof. C. Patel' },
        { title: 'Advanced Thermal Engineering', author: 'Dr. D. Mehta' },
        { title: 'Structural Analysis and Design', author: 'Prof. E. Shah' },
        { title: 'Computational Fluid Dynamics', author: 'Dr. F. Rao' },
        { title: 'Bioengineering Breakthroughs', author: 'Prof. G. Yadav' },
        { title: 'Modern Chemical Processes', author: 'Dr. H. Patel' },
        { title: 'Electronic Circuit Design', author: 'Prof. I. Verma' },
        { title: 'Advanced Software Engineering', author: 'Dr. J. Sharma' },
        { title: 'Civil Engineering Innovations', author: 'Prof. K. Gupta' },
        { title: 'Engineering Mathematics Advances', author: 'Dr. L. Desai' },
        { title: 'Energy Systems and Management', author: 'Prof. M. Shah' },
        { title: 'Artificial Intelligence Applications', author: 'Dr. N. Jain' },
        { title: 'Mechanical Engineering Fundamentals', author: 'Prof. O. Kumar' },
        { title: 'Environmental Impact Assessments', author: 'Dr. P. Rao' },
        { title: 'Marine Engineering Technologies', author: 'Prof. Q. Nair' },
        { title: 'Aerospace Systems and Design', author: 'Dr. R. Patel' }
    ],
    events: [
      { title: 'Annual Tech Fest', date: 'March 15, 2024' },
      { title: 'Guest Lecture Series', date: 'June 10, 2024' },
      { title: 'Inter-college Robotics Competition', date: 'April 20, 2024' },
      { title: 'National Engineering Conference', date: 'July 15, 2024' },
      { title: 'Student Innovation Showcase', date: 'August 5, 2024' },
      { title: 'Alumni Meet', date: 'September 22, 2024' },
      { title: 'Engineering Workshop Week', date: 'October 10-14, 2024' },
      { title: 'Annual Sports Day', date: 'November 3, 2024' },
      { title: 'Cultural Fest', date: 'December 15, 2024' },
      { title: 'International Guest Speaker Series', date: 'January 25, 2024' },
      { title: 'Research Symposium', date: 'February 18, 2024' },
      { title: 'Career Fair', date: 'March 30, 2024' },
      { title: 'Summer Internship Program', date: 'May 1, 2024' },
      { title: 'Science and Engineering Fair', date: 'June 5, 2024' },
      { title: 'Design Thinking Workshop', date: 'July 12, 2024' },
      { title: 'Technology Transfer Seminar', date: 'August 25, 2024' },
      { title: 'Engineering Design Contest', date: 'September 10, 2024' },
      { title: 'Health and Wellness Week', date: 'October 1-7, 2024' },
      { title: 'International Engineering Day', date: 'November 20, 2024' },
      { title: 'Research and Development Expo', date: 'December 22, 2024' }
    ],
    achievements: [
      "VJTI secured the 150 - 200 position in the National Institutional Ranking Framework (NIRF) 2024.",
      "Our Computer Science and Engineering program received reaccreditation from the National Board of Accreditation (NBA).",
      "Awarded ₹5 crore in research grants from the Department of Science and Technology (DST) for innovative research in Artificial Intelligence.",
      "Filed 3 patents for new technologies developed in our Robotics and Mechanical Engineering departments.",
      "Our team won the first prize in the RoboMasters Competition 2024 held in China and secured top positions in the Smart India Hackathon.",
      "Completed the construction of the new Innovation Hub, featuring state-of-the-art laboratories and collaborative spaces.",
      "Achieved a 90% placement rate for the graduating class of 2024, with notable recruiters including JPMC, Citi, Microsoft, Google"
    ]
  });

  const [stateIT] = useState(stateCS);
  const [stateCIVIL] = useState(stateCS);
  const [stateMECH] = useState(stateCS);
  const [stateELECTRICAL] = useState(stateCS);
  const [stateEXTC] = useState(stateCS);
  const [statePROD] = useState(stateCS);

  useEffect(() => {
    axios
      .get("http://localhost:8088/departments/alldepartment")
      .then((res) => {
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
    let file = '';
    return () => {
      if (departmentName === "CS") {
        toast.info("Downloading Report");
        axios.post('http://localhost:8088/create-pdf-cs', stateCS)
          .then((response) => {
            const { fileName } = response.data;
            file = fileName
            return axios.get(`http://localhost:8088/fetch-pdf-cs/${fileName}`, { responseType: 'blob' });
          })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, file);
            toast.success("Report Downloaded Successfully");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error downloading report");
          });
      }
      else if (departmentName === "IT") {
        toast.info("Downloading Report");
        axios.post('http://localhost:8088/create-pdf-it', stateIT)
          .then((response) => {
            const { fileName } = response.data;
            file = fileName;
            return axios.get(`http://localhost:8088/fetch-pdf-it/${fileName}`, { responseType: 'blob' });
          })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, file);
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
                              {/* <td>{department.department_coordinator}</td> */}
                              <td> Prof. CP Adhik </td>
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
