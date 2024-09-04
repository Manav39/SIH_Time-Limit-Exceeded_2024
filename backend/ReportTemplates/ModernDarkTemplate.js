module.exports = ({
  vision,
  mission,
  history,
  boardOfDirectors = [],
  facultyRecord = [],
  departments = [],
  publications = [],
  events = [],
  achievements = []
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
            font-family: 'Roboto', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #1e1e2f;
            color: #ffffff;
          }
          .page-break {
            page-break-after: always;
          }
          .report-box {
            max-width: 1200px;
            margin: 20px auto;
            padding: 40px;
            background-color: #1e1e2f;
            color: #ffffff;
            font-family: 'Roboto', sans-serif;
            line-height: 1.6;
          }
          .cover-page {
            position: relative;
            text-align: center;
            color: #ffffff;
            margin-bottom: 60px;
          }
          .cover-image {
            width: 100%;
            height: 500px;
            object-fit: cover;
            border-radius: 10px;
          }
          .cover-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(30, 30, 47, 0.8);
            padding: 20px 40px;
            border-radius: 10px;
          }
          .cover-text h1 {
            font-size: 3em;
            margin: 0;
          }
          .cover-text p {
            font-size: 1.2em;
            margin: 5px 0;
          }
          .section {
            margin-bottom: 15px;
          }
          .section-title {
            font-size: 2em;
            font-family: 'Montserrat', sans-serif;
            border-bottom: 3px solid #00bfa6;
            padding-bottom: 10px;
            margin-bottom: 30px;
            color: #00bfa6;
          }
          .text {
            font-size: 1.1em;
          }
          .two-column-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .table-header {
            background-color: #00bfa6;
            color: #1e1e2f;
            text-align: left;
            padding: 12px;
            font-family: 'Montserrat', sans-serif;
            font-size: 1em;
          }
          .table-row {
            background-color: #2e2e4d;
          }
          .table-data {
            padding: 12px;
            border-bottom: 1px solid #3e3e5e;
          }
          .footer {
            text-align: center;
            padding: 20px;
            border-top: 1px solid #3e3e5e;
            margin-top: 60px;
            font-size: 0.9em;
            color: #bbbbbb;
          }
          .footer a {
            color: #00bfa6;
            text-decoration: none;
          }
          .download-button {
            display: inline-block;
            padding: 15px 30px;
            background-color: #00bfa6;
            color: #1e1e2f;
            text-align: center;
            border-radius: 5px;
            text-decoration: none;
            font-size: 1em;
            font-family: 'Montserrat', sans-serif;
            cursor: pointer;
            margin-top: 30px;
            border: none;
          }
        </style>
      </head>
      <body>
        <div class="report-box">
          <!-- Cover Page -->
          <div class="cover-page">
            <img
              src="https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"
              alt="VJTI Cover"
              class="cover-image"
            />
            <div class="cover-text">
              <h1>VJTI Annual Report</h1>
              <p>Year: 2024</p>
              <p>Date: ${formattedDate}</p>
            </div>
          </div>

          <!-- Vision and Mission -->
          <div class="section">
            <h2 class="section-title">Vision & Mission</h2>
            <div class="text">
              <h3 style="color: #ffaa00;">Our Vision</h3>
              <p>${vision}</p>
              <h3 style="color: #ffaa00; margin-top: 20px;">Our Mission</h3>
              <p>${mission}</p>
            </div>
          </div>

          <!-- History -->
          <div class="section">
            <h2 class="section-title">Our History</h2>
            <p class="text">${history}</p>
          </div>

          <div class="page-break"></div>
          <br/>

          <!-- Board of Directors and Faculty Records -->
          <div class="section">
            <h2 class="section-title">Our Team</h2>
            <div class="two-column-grid">
              <!-- Board of Directors -->
              <div>
                <h3 style="color: #ffaa00; margin-bottom: 15px;">Board of Directors</h3>
                <table class="table">
                  <thead>
                    <tr>
                      <th class="table-header">Name</th>
                      <th class="table-header">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${boardOfDirectors.map((director) => `
                      <tr class="table-row">
                        <td class="table-data">${director.name}</td>
                        <td class="table-data">${director.position}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <div class="page-break"></div>
              <br/>

              <!-- Faculty Records -->
              <div>
                <h3 style="color: #ffaa00; margin-bottom: 15px;">Faculty Records</h3>
                <table class="table">
                  <thead>
                    <tr>
                      <th class="table-header">Name</th>
                      <th class="table-header">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${facultyRecord.map((faculty) => `
                      <tr class="table-row">
                        <td class="table-data">${faculty.name}</td>
                        <td class="table-data">${faculty.position}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="page-break"></div>
          <br/>

          <!-- Departments -->
          <div class="section">
            <h2 class="section-title">Departments</h2>
            <table class="table">
              <thead>
                <tr>
                  <th class="table-header">#</th>
                  <th class="table-header">Department Name</th>
                </tr>
              </thead>
              <tbody>
                ${departments.map((department, index) => `
                  <tr class="table-row">
                    <td class="table-data">${index + 1}</td>
                    <td class="table-data">${department}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="page-break"></div>
          <br/>

          <!-- Publications -->
          <div class="section">
            <h2 class="section-title">Publications</h2>
            <table class="table">
              <thead>
                <tr>
                  <th class="table-header">Title</th>
                  <th class="table-header">Author</th>
                  <th class="table-header">Link</th>
                </tr>
              </thead>
              <tbody>
                ${publications.map((publication) => `
                  <tr class="table-row">
                    <td class="table-data">${publication.title}</td>
                    <td class="table-data">${publication.author}</td>
                    <td class="table-data">
                      <a href="#" style="color: #00bfa6; text-decoration: none;">View Paper</a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="page-break"></div>
          <br/>

          <!-- Events -->
          <div class="section">
            <h2 class="section-title">Events</h2>
            <table class="table">
              <thead>
                <tr>
                  <th class="table-header">Event Name</th>
                  <th class="table-header">Date</th>
                </tr>
              </thead>
              <tbody>
                ${events.map((event) => `
                  <tr class="table-row">
                    <td class="table-data">${event.title}</td>
                    <td class="table-data">${event.date}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="page-break"></div>
          <br/>

          <!-- Achievements -->
          <div class="section">
            <h2 class="section-title">Achievements</h2>
            <ul>
              ${achievements.map((achievement) => `
                <li style="margin-bottom: 10px;">${achievement}</li>
              `).join('')}
            </ul>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>&copy; 2024 Veermata Jijabai Technological Institute. All rights reserved.</p>
            <p>Address: H. R. Mahajani Marg, Matunga, Mumbai - 400019, India</p>
            <p>
              Website: <a href="https://vjti.ac.in" style="color: #00bfa6; text-decoration: none;">www.vjti.ac.in</a>
            </p>
          </div>

        </div>
      </body>
    </html>
  `;
};
