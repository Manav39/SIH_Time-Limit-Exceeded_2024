import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaLink } from 'react-icons/fa';
import { Tooltip, OverlayTrigger, Alert } from 'react-bootstrap';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' }); // New state for messages

  useEffect(() => {
    // Static data for demonstration
    setRequests([
      {
        id: 1,
        title: 'Research Publication on Quantum Computing',
        description: 'A comprehensive research paper on the applications of quantum computing in data science.',
        submittedBy: 'student',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification1',
      },
      {
        id: 2,
        title: 'New Course Proposal: Advanced AI',
        description: 'Proposal for a new course on advanced artificial intelligence techniques and their applications.',
        submittedBy: 'faculty',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification2',
      },
      {
        id: 3,
        title: 'Conference Presentation on Machine Learning',
        description: 'Details of a recent presentation at a major conference on machine learning advancements.',
        submittedBy: 'student',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification3',
      },
      {
        id: 4,
        title: 'Workshop on Embedded Systems',
        description: 'Workshop proposal focusing on practical applications and developments in embedded systems.',
        submittedBy: 'faculty',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification4',
      },
      {
        id: 5,
        title: 'Funding Request for Robotics Lab',
        description: 'Request for funding to upgrade and expand the robotics lab facilities.',
        submittedBy: 'student',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification5',
      },
      {
        id: 6,
        title: 'New Research Project: Sustainable Energy',
        description: 'Proposal for a new research project focused on sustainable energy solutions.',
        submittedBy: 'faculty',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification6',
      },
      {
        id: 7,
        title: 'Publication on Data Privacy',
        description: 'A detailed study on the latest trends and practices in data privacy and protection.',
        submittedBy: 'student',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification7',
      },
      {
        id: 8,
        title: 'Seminar on Cybersecurity Best Practices',
        description: 'Seminar proposal covering best practices in cybersecurity for academic and professional audiences.',
        submittedBy: 'faculty',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification8',
      },
      {
        id: 9,
        title: 'Course Development: Blockchain Technology',
        description: 'Proposal to develop a new course on blockchain technology and its applications.',
        submittedBy: 'student',
        authors: 'faculty',
        verificationLink: 'https://example.com/verification9',
      }
    ]);
  }, []);

  const staticUsers = {
    'user1': { name: 'John Doe', role: 'student' },
    'user2': { name: 'Jane Smith', role: 'faculty' },
    'user3': { name: 'Emily Davis', role: 'student' },
    'user4': { name: 'Michael Brown', role: 'faculty' }
  };

  const CutDescription = ({ description }) => {
    const maxLength = 100;
    if (description.length > maxLength) {
      return (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {description}
        </div>
      );
    }
    return <p>{description}</p>;
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.children}
    </Tooltip>
  );

  const TruncatedLink = ({ link }) => {
    const maxLength = 30;
    return link.length > maxLength ? (
      <OverlayTrigger placement="top" overlay={renderTooltip({ children: link })}>
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
          {link.substring(0, maxLength)}...
        </a>
      </OverlayTrigger>
    ) : (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
        {link}
      </a>
    );
  };

  const handleApprove = (id) => {
    setRequests(requests.filter(request => request.id !== id));
    setMessage({ text: 'Request Approved!', type: 'success' });
    console.log(`Approved request with ID: ${id}`);
  };

  const handleReject = (id) => {
    setRequests(requests.filter(request => request.id !== id));
    setMessage({ text: 'Request Rejected!', type: 'danger' });
    console.log(`Rejected request with ID: ${id}`);
  };

  return (
    <div className="container-fluid">
      {message.text && (
        <Alert variant={message.type} onClose={() => setMessage({ text: '', type: '' })} dismissible>
          {message.text}
        </Alert>
      )}
      <div className="card">
        <div className="card-header">
          <b>Pending Requests</b>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-condensed table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="">Title</th>
                  <th className="">Description</th>
                  <th className="">Submitter</th>
                  <th className="">Role</th>
                  <th className="">Verification Link</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((request, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>{request.title}</td>
                      <td><CutDescription description={request.description} /></td>
                      <td>{staticUsers[request.submittedBy] ? staticUsers[request.submittedBy].name : 'Loading...'}</td>
                      <td>{staticUsers[request.submittedBy] ? staticUsers[request.submittedBy].role : 'Loading...'}</td>
                      <td>
                        {request.verificationLink ? (
                          <TruncatedLink link={request.verificationLink} />
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          style={{ marginBottom: "10px" }}
                          onClick={() => handleApprove(request.id)}
                          className="btn btn-sm btn-outline-success"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No Requests Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRequests;
