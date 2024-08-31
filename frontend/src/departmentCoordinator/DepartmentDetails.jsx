import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

const DepartmentDetails = () => {
  const [department, setDepartment] = useState({
    name: "Computer Science",
    hod: "Dr. John Doe",
    departmentCoordinator: "Jane Smith",
    faculties: [
      "Dr. Emily Davis",
      "Bhole Jadhav",
      "Sachin kore",
    ],
    yearWiseIntake: 120,
    academicPerformance: {
      highestCgpaYearWise: [
        { year: 2023, cgpa: 9.5 },
        { year: 2022, cgpa: 9.4 },
        { year: 2021, cgpa: 9.3 },
        { year: 2020, cgpa: 9.2 },
        {year : 2019, cgpa:9.8}
      ],
      researchPublications: [
        "Quantum Computing in AI",
        "Advances in Neural Networks",
        "Machine Learning Algorithms for Big Data",
        "Ethics in Artificial Intelligence",
        "Deep Learning for Image Recognition"
      ],
      conferences: [
        "AI Summit 2023",
        "Blockchain Conference 2022",
        "International Conference on Machine Learning 2023",
        "Global Symposium on Quantum Technologies 2024",
        "Annual Tech Innovations Conference 2023"
      ]
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(department);

  const handleEdit = () => {
    setEditData(department);
    setShowModal(true);
  };

  const handleSave = () => {
    setDepartment(editData);
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-header">
          <h3>{department.name}</h3>
          <button className="btn btn-primary float-right" onClick={handleEdit}>
            <FaEdit /> Edit
          </button>
        </div>
        <div className="card-body">
          <p><strong>Head of Department:</strong> {department.hod}</p>
          <p><strong>Department Coordinator:</strong> {department.departmentCoordinator}</p>
          <p><strong>Number of Faculties:</strong> {department.faculties.length}</p>
          <ul>
            {department.faculties.map((faculty, index) => (
              <li key={index}>{faculty}</li>
            ))}
          </ul>
          <p><strong>Year-Wise Intake:</strong> {department.yearWiseIntake}</p>
          <h5>Academic Performance</h5>
          <ul>
            {department.academicPerformance.highestCgpaYearWise.map((record, index) => (
              <li key={index}>Year: {record.year} - Highest CGPA: {record.cgpa}</li>
            ))}
          </ul>
          <h5>Research Publications</h5>
          <ul>
            {department.academicPerformance.researchPublications.map((pub, index) => (
              <li key={index}>{pub}</li>
            ))}
          </ul>
          <h5>Conferences</h5>
          <ul>
            {department.academicPerformance.conferences.map((conf, index) => (
              <li key={index}>{conf}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Department Name</label>
            <input
              type="text"
              className="form-control"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Head of Department</label>
            <input
              type="text"
              className="form-control"
              value={editData.hod}
              onChange={(e) => setEditData({ ...editData, hod: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Department Coordinator</label>
            <input
              type="text"
              className="form-control"
              value={editData.departmentCoordinator}
              onChange={(e) => setEditData({ ...editData, departmentCoordinator: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Year-Wise Intake</label>
            <input
              type="number"
              className="form-control"
              value={editData.yearWiseIntake}
              onChange={(e) => setEditData({ ...editData, yearWiseIntake: parseInt(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label>Faculties (Comma separated)</label>
            <input
              type="text"
              className="form-control"
              value={editData.faculties.join(', ')}
              onChange={(e) => setEditData({ ...editData, faculties: e.target.value.split(',').map(faculty => faculty.trim()) })}
            />
          </div>
          <div className="form-group">
            <label>Research Publications (Comma separated)</label>
            <input
              type="text"
              className="form-control"
              value={editData.academicPerformance.researchPublications.join(', ')}
              onChange={(e) => setEditData({ ...editData, academicPerformance: { ...editData.academicPerformance, researchPublications: e.target.value.split(',').map(pub => pub.trim()) } })}
            />
          </div>
          <div className="form-group">
            <label>Conferences (Comma separated)</label>
            <input
              type="text"
              className="form-control"
              value={editData.academicPerformance.conferences.join(', ')}
              onChange={(e) => setEditData({ ...editData, academicPerformance: { ...editData.academicPerformance, conferences: e.target.value.split(',').map(conf => conf.trim()) } })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DepartmentDetails;
