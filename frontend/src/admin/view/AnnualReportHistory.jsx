import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnnualReportHistory = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8088/reports-history')
      .then(response => {
        const pdfFiles = response.data.filter(file => file.fileName.endsWith('.pdf'));
        setFiles(pdfFiles);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  const openFile = (fileName) => {
    window.open(`http://localhost:8088/reports/${fileName}`, '_blank');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredFiles = files.filter(file =>
    file.fileName.toLowerCase().includes(searchTerm) ||
    file.date.toLowerCase().includes(searchTerm)
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Report Download History</h2>

      <input
        type="text"
        placeholder="Search by file name or date"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      />

      {filteredFiles.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#999' }}>No reports match your search criteria.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd', color: '#555' }}>File Name</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd', color: '#555' }}>Date</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd', color: '#555' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', color: '#333' }}>{file.fileName}</td>
                <td style={{ padding: '12px', color: '#333' }}>{file.date}</td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => openFile(file.fileName)} 
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnnualReportHistory;
