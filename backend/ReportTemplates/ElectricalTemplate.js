module.exports = ({
    vision,
    mission,
    history,
    boardOfDirectors = [],
    facultyRecord = [],
    departments = [],
    publications = [],
    events = [],
    achievements = [],
  }) => {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>VJTI Annual Report 2024 - Electrical</title>
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
              padding: 15px;
              text-align: center;
              border-radius: 5px;
              font-size: 26px; /* Increased font size for headings */
            }
            .section {
              margin-bottom: 30px;
            }
            .section h2 {
              color: #007BFF;
              font-size: 22px;
              margin-bottom: 15px;
            }
            .section p {
              font-size: 18px; /* Increased font size for regular text */
              line-height: 1.6;
              margin: 0;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .table th, .table td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .table th {
              background-color: #007BFF;
              color: white;
              font-size: 18px; /* Increased font size for table headers */
            }
            .table td {
              font-size: 16px; /* Increased font size for table content */
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
              font-size: 16px;
              color: #777;
            }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 10px;
            }
            .cover-image {
              border-radius: 15px;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            }
            .section img {
              border-radius: 10px;
            }
          </style>
        </head>
        <body>
          <div class="report-box">
            <!-- Cover Page -->
            <div class="section">
              <div class="heading">
                <h1>VJTI Annual Report 2024 - Electrical</h1>
              </div>
              <div style="text-align: center; margin: 20px 0;">
                <img
                  src="https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"
                  class="cover-image"
                  alt="VJTI Main Gate"
                />
              </div>
              <p style="text-align: center; font-size: 20px;"><strong>Date:</strong> ${formattedDate}</p>
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
            <br />
  
            <!-- Board of Directors -->
            <div class="section">
            <div style="text-align: center; margin: 20px 0;">
                <img
                  src="https://vjti.ac.in/wp-content/uploads/2024/07/sachin-kore-sir-768x512.png"
                  class="cover-image"
                  alt="VJTI Main Gate"
                />
              </div>
              <br/>
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
            <br />
  
            <!-- Departments -->
            <div class="section">
            <div style="text-align: center; margin: 20px 0;">
                <img
                  src="https://vjti.ac.in/wp-content/uploads/elementor/thumbs/vjti-old-qquq2knh6gepn33yplkvt74bt6dtqadl87ab55ky9w.png"
                  class="cover-image"
                  alt="VJTI Main Gate"
                />
              </div>
              <br/>
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
            <br />
  
            <!-- Publications -->
            <div class="section">
              <h2>Publications</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  ${publications
                    .map(
                      (publication) => `
                  <tr class="item">
                    <td>${publication.title}</td>
                    <td>${publication.author}</td>
                    <td><a href="#">Paper</a></td>
                  </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
  
            <div class="page-break"></div>
            <br />
  
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

            <div class="page-break"></div>
            <br />

            <!-- Achievements -->
            <div class="section">
            <div style="text-align: center; margin: 20px 0;">
                <img
                  src="https://vjti.ac.in/wp-content/uploads/elementor/thumbs/vjti-first-qquq2knh6gepn33yplkvt74bt6dtqadl87ab55ky9w.png"
                  class="cover-image"
                  alt="VJTI Main Gate"
                />
              </div>
              <br/>
              <h2>Achievements</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Achievement Title</th>
                  </tr>
                </thead>
                <tbody>
                  ${achievements
                    .map(
                      (achievement) => `
                  <tr class="item">
                    <td>${achievement}</td>
                  </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
  
            <br />
  
            <!-- Footer -->
            <div class="footer">
              <p>&copy; 2024 VJTI. All rights reserved.</p>
              <p>Address: VJTI, Mumbai, India</p>
              <p>Website: <a href="https://vjti.ac.in" target="_blank">vjti.ac.in</a></p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  