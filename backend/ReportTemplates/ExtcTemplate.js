module.exports = ({
    vision,
    mission,
    history,
    boardOfDirectors = [],
    facultyRecord = [],
    departments = [],
    publications = [],
    events = [],
  }) => {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>VJTI Annual Report 2024</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .report-box {
              max-width: 210mm; /* A4 size width */
              margin: 20px auto;
              padding: 30px; /* Increased padding for better spacing */
              background: #fff;
              border-radius: 10px;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            }
            .heading {
              background: #007BFF;
              color: white;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-size: 24px; /* Increased font size for headings */
            }
            .section {
              margin-bottom: 30px;
            }
            .section h2 {
              color: #007BFF;
              font-size: 20px;
              margin-bottom: 10px;
            }
            .section p {
              font-size: 16px; /* Increased font size for regular text */
              line-height: 1.6;
              margin: 0;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .table th, .table td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .table th {
              background-color: #007BFF;
              color: white;
              font-size: 16px; /* Increased font size for table headers */
            }
            .table td {
              font-size: 14px; /* Increased font size for table content */
            }
            .item {
              background-color: #f9f9f9;
            }
            .page-break {
              page-break-after: always;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="report-box">
            <!-- Cover Page -->
            <div class="section">
              <div class="heading">
                <h1>VJTI Annual Report 2024 - Electronics And Telecommunications</h1>
              </div>
              <div style="text-align: center; margin: 20px 0;">
                <img
                  src="https://vjti.ac.in/wp-content/uploads/2024/06/vjti-maingate.png"
                  style="width: 100%; border-radius: 10px;"
                  alt="VJTI Image"
                />
              </div>
              <p style="text-align: center; font-size: 18px;"><strong>Date:</strong> ${formattedDate}</p>
            </div>
  
            <!-- Vision, Mission, History -->
            <div class="section">
              <h2>Vision</h2>
              <p>${vision}</p>
            </div>
            <div class="section">
              <h2>Mission</h2>
              <p>${mission}</p>
            </div>
            <div class="section">
              <h2>History</h2>
              <p>${history}</p>
            </div>
  
            <div class="page-break"></div>
            <br/>
  
            <!-- Board of Directors -->
            <div class="section">
              <h2>Board of Directors</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  ${boardOfDirectors
                    .map(
                      (director) => `
                  <tr class="item">
                    <td>${director.name}</td>
                    <td>${director.position}</td>
                  </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
  
            <div class="page-break"></div>
            <br/>
  
            <!-- Faculty Records -->
            <div class="section">
              <h2>Faculty Records</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  ${facultyRecord
                    .map(
                      (faculty) => `
                  <tr class="item">
                    <td>${faculty.name}</td>
                    <td>${faculty.position}</td>
                  </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
  
            <div class="page-break"></div>
            <br/>
  
            <!-- Departments -->
            <div class="section">
              <h2>Departments</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  ${departments
                    .map(
                      (department) => `
                  <tr class="item">
                    <td>${department}</td>
                  </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
  
            <div class="page-break"></div>
            <br/>
  
            <!-- Publications -->
            <div class="section">
              <h2>Publications</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                  </tr>
                </thead>
                <tbody>
                  ${publications
                    .map(
                      (publication) => `
                  <tr class="item">
                    <td>${publication.title}</td>
                    <td>${publication.author}</td>
                  </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
  
            <div class="page-break"></div>
            <br/>
  
            <!-- Events -->
            <div class="section">
              <h2>Events</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${events
                    .map(
                      (event) => `
                  <tr class="item">
                    <td>${event.title}</td>
                    <td>${event.date}</td>
                  </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
  
            <!-- Footer -->
            <div class="footer">
              <p>&copy; 2024 VJTI. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  