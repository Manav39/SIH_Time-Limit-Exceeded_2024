const express = require("express");
const { connectToMongo } = require("./connect");
require("dotenv").config();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

const classicTemplate = require('./ReportTemplates/ClassicTemplate');
const modernDarkTemplate = require('./ReportTemplates/ModernDarkTemplate');
const pdfTemplateCs = require('../backend/ReportTemplates/CsTemplate');
const pdfTemplateIt = require('../backend/ReportTemplates/ItTemplate');
const pdfTemplateCivil = require('../backend/ReportTemplates/CivilTemplate');
const pdfTemplateMech = require('../backend/ReportTemplates/MechTemplate');
const pdfTemplateElectrical = require('../backend/ReportTemplates/ElectricalTemplate');
const pdfTemplateExtc = require('../backend/ReportTemplates/ExtcTemplate');
const pdfTemplateProd = require('../backend/ReportTemplates/ProdTemplate');

const app = express();
const PORT = process.env.PORT || 8088;

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const reportsDirectory = path.join(__dirname, '');
app.use('/reports', express.static(reportsDirectory));

app.get('/reports-history', (req, res) => {
  fs.readdir(reportsDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to list files' });
    }

    const reportFiles = files.map(file => ({
      fileName: file,
      path: path.join(reportsDirectory, file),
      date: fs.statSync(path.join(reportsDirectory, file)).mtime.toLocaleDateString()
    }));

    res.json(reportFiles);
  });
});

app.post('/create-pdf-classic', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_CLASSIC_${timestamp}.pdf`;
  const filePath = path.join(__dirname, fileName);

  pdf.create(classicTemplate(req.body), {}).toFile(filePath, (err) => {
      if(err) {
          res.status(500).send({ error: 'Failed to create PDF' });
      } else {
          res.status(200).send({ fileName });
      }
  });
});

app.get('/fetch-pdf-classic/:fileName', (req, res) => {
  const filePath = path.join(__dirname, req.params.fileName);
  if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
  } else {
      res.status(404).send({ error: 'File not found' });
  }
});

app.post('/create-pdf-modern-dark', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_MODERN_DARK_${timestamp}.pdf`;
  const filePath = path.join(__dirname, fileName);

  pdf.create(modernDarkTemplate(req.body), {}).toFile(filePath, (err) => {
      if(err) {
          res.status(500).send({ error: 'Failed to create PDF' });
      } else {
          res.status(200).send({ fileName });
      }
  });
});

app.get('/fetch-pdf-modern-dark/:fileName', (req, res) => { 
  const filePath = path.join(__dirname, req.params.fileName);
  if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
  } else {
      res.status(404).send({ error: 'File not found' });
  }
})

// CS Report
app.post('/create-pdf-cs', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_CS_${timestamp}.pdf`;
  pdf.create(pdfTemplateCs(req.body), {}).toFile(fileName, (err) => {
    if (err) {
      return res.status(500).send(Promise.reject());
    }
    res.send({ fileName });
  });
});
app.get('/fetch-pdf-cs/:fileName', (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, fileName));
});

// IT Report
app.post('/create-pdf-it', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_IT_${timestamp}.pdf`;
  pdf.create(pdfTemplateIt(req.body), {}).toFile(fileName, (err) => {
    if (err) {
      return res.status(500).send(Promise.reject());
    }
    res.send({ fileName });
  });
});
app.get('/fetch-pdf-it/:fileName', (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, fileName));
});

// Civil Report
app.post('/create-pdf-civil', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_CIVIL_${timestamp}.pdf`;
  pdf.create(pdfTemplateCivil(req.body), {}).toFile(fileName, (err) => {
    if (err) {
      return res.status(500).send(Promise.reject());
    }
    res.send({ fileName });
  });
});
app.get('/fetch-pdf-civil/:fileName', (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, fileName));
});

// Mech Report
app.post('/create-pdf-mech', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_MECH_${timestamp}.pdf`;
  pdf.create(pdfTemplateMech(req.body), {}).toFile(fileName, (err) => {
    if (err) {
      return res.status(500).send(Promise.reject());
    }
    res.send({ fileName });
  });
});
app.get('/fetch-pdf-mech/:fileName', (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, fileName));
});

// Electrical Report
app.post('/create-pdf-electrical', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_ELECTRICAL_${timestamp}.pdf`;
  pdf.create(pdfTemplateElectrical(req.body), {}).toFile(fileName, (err) => {
    if (err) {
      return res.status(500).send(Promise.reject());
    }
    res.send({ fileName });
  });
});
app.get('/fetch-pdf-electrical/:fileName', (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, fileName));
});

// EXTC Report
app.post('/create-pdf-extc', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_EXTC_${timestamp}.pdf`;
  pdf.create(pdfTemplateExtc(req.body), {}).toFile(fileName, (err) => {
    if (err) {
      return res.status(500).send(Promise.reject());
    }
    res.send({ fileName });
  });
});
app.get('/fetch-pdf-extc/:fileName', (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, fileName));
});

// PROD Report
app.post('/create-pdf-prod', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const fileName = `VJTI_REPORT_PROD_${timestamp}.pdf`;
  pdf.create(pdfTemplateProd(req.body), {}).toFile(fileName, (err) => {
    if (err) {
      return res.status(500).send(Promise.reject());
    }
    res.send({ fileName });
  });
});
app.get('/fetch-pdf-prod/:fileName', (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, fileName));
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
connectToMongo(
  process.env.MONGO_URI ||
    "mongodb+srv://tle:tle@tle.eryr0.mongodb.net/?retryWrites=true&w=majority&appName=TLE"
)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

//creating routes
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/author");
const publicationRoutes = require("./routes/publications");
const eventRoutes = require("./routes/event");
const departmentRoutes = require("./routes/department");
const collegeRoutes = require("./routes/colleges");
const dataEntryRoutes = require("./routes/dataEntry");
const departmentCoordinatorRoutes = require("./routes/departmentCoord");

//routes
app.use("/", userRoutes);
app.use("/author", authorRoutes);
app.use("/publications", publicationRoutes);
app.use("/events", eventRoutes);
app.use("/departments", departmentRoutes);
app.use("/colleges", collegeRoutes);
app.use("/data-entries", dataEntryRoutes);
app.use("/departmentcoordnator", departmentCoordinatorRoutes);

// Root route for testing the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
