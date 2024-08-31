const express = require("express");
const { connectToMongo } = require("./connect");
require("dotenv").config();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');

const pdfTemplate = require('../backend/ReportTemplates/ReportTemplate');
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

// Annual Report
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('VJTI_REPORT.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf', (req, res) => { res.sendFile(`${__dirname}/VJTI_REPORT.pdf`) })

// CS Report
app.post('/create-pdf-cs', (req, res) => {
  pdf.create(pdfTemplateCs(req.body), {}).toFile('VJTI_REPORT_CS.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf-cs', (req, res) => { res.sendFile(`${__dirname}/VJTI_REPORT_CS.pdf`) })

// IT Report
app.post('/create-pdf-it', (req, res) => {
  pdf.create(pdfTemplateIt(req.body), {}).toFile('VJTI_REPORT_IT.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf-it', (req, res) => { res.sendFile(`${__dirname}/VJTI_REPORT_IT.pdf`) })

// Civil Report
app.post('/create-pdf-civil', (req, res) => {
  pdf.create(pdfTemplateCivil(req.body), {}).toFile('VJTI_REPORT_CIVIL.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf-civil', (req, res) => { res.sendFile(`${__dirname}/VJTI_REPORT_CIVIL.pdf`) })

// Mech Report
app.post('/create-pdf-mech', (req, res) => {
  pdf.create(pdfTemplateMech(req.body), {}).toFile('VJTI_REPORT_MECH.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf-mech', (req, res) => { res.sendFile(`${__dirname}/VJTI_REPORT_MECH.pdf`) })

// Electrical Report
app.post('/create-pdf-electrical', (req, res) => {
  pdf.create(pdfTemplateElectrical(req.body), {}).toFile('VJTI_REPORT_ELECTRICAL.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf-electrical', (req, res) => { res.sendFile(`${__dirname}/VJTI_REPORT_ELECTRICAL.pdf`) })

// EXTC Report
app.post('/create-pdf-extc', (req, res) => {
  pdf.create(pdfTemplateExtc(req.body), {}).toFile('VJTI_REPORT_EXTC.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf-extc', (req, res) => { res.sendFile(`${__dirname}/VJTI_REPORT_EXTC.pdf`) })

// PROD Report
app.post('/create-pdf-prod', (req, res) => {
  pdf.create(pdfTemplateProd(req.body), {}).toFile('VJTI_REPORT_PROD.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf-prod', (req, res) => { res.sendFile(`${__dirname}/VJTI_REPORT_PROD.pdf`) })

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
