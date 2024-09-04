import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from "react-toastify";
import ModernDarkTemplate from "./ModernDarkTemplate";
import ClassicTemplate from "./ClassicTemplate";

const AnnualReport = () => {
  const navigate = useNavigate();
  const [state] = useState({
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
    ],
    studentAchievements: [
      { name: 'Aarti Patel', achievement: 'Won the Gold Medal in International Mathematics Olympiad 2024.' },
      { name: 'Ravi Sharma', achievement: 'Secured the First Place in National Coding Competition 2024.' },
      { name: 'Sneha Desai', achievement: 'Awarded Best Paper Presentation at the International Conference on Renewable Energy.' },
      { name: 'Amit Kumar', achievement: 'Recognized as the Best Student Entrepreneur in the University Start-up Contest.' },
      { name: 'Priya Gupta', achievement: 'Received the National Scholarship for Excellence in Engineering Studies.' },
      { name: 'Nikhil Rathi', achievement: 'Achieved the Best Research Project Award in the Annual Science Fair.' },
      { name: 'Neha Singh', achievement: 'Won the Gold Medal in All-India Debate Competition 2024.' },
      { name: 'Rajesh Verma', achievement: 'Secured Top Rank in National Robotics Challenge.' }
    ],
    extracurriculars: [
      { activity: 'President of the Student Council', student: 'Ravi Sharma', description: 'Led the student council in organizing campus events and improving student engagement.' },
      { activity: 'Founder of Tech Club', student: 'Sneha Desai', description: 'Initiated and managed various tech workshops and guest lectures for the student body.' },
      { activity: 'Editor of the College Magazine', student: 'Aarti Patel', description: 'Oversaw the publication and content creation for the college magazine.' },
      { activity: 'Captain of the College Football Team', student: 'Amit Kumar', description: 'Led the team to victory in the inter-college football championship.' },
      { activity: 'Volunteer at the Annual Science Fair', student: 'Priya Gupta', description: 'Coordinated with participants and assisted in the smooth execution of the science fair.' },
      { activity: 'Coordinator of the Environment Club', student: 'Nikhil Rathi', description: 'Organized various environmental awareness programs and sustainability initiatives on campus.' },
      { activity: 'Head of the Cultural Fest Committee', student: 'Neha Singh', description: 'Managed the organization and execution of the annual cultural fest.' },
      { activity: 'Member of the University Debate Team', student: 'Rajesh Verma', description: 'Participated in national debate competitions and won accolades for the team.' }
    ]
  });

  const styles = {
    button: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      // display: "block",
      margin: "30px auto",
      marginRight: "110px",
      width: "25%",
    }
  }

  const [selectedTemplate, setSelectedTemplate] = useState("modern-dark");
  const formattedDate = new Date().toLocaleDateString();

  const viewHistory = () => {
    navigate("/dashboard/report/history");
  }

  const createAndDownloadPdf = () => {
    toast.info("Downloading Report");
    
    const downloadPdf = (fileName) => {
      axios.get(`http://localhost:8088/fetch-pdf-classic/${fileName}`, { responseType: 'blob' })
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          saveAs(pdfBlob, fileName); 
          toast.success("Report Downloaded Successfully");
        })
        .catch((error) => {
          toast.error("Failed to download the report");
          console.error('Error downloading file:', error);
        });
    };
  
    if (selectedTemplate === 'modern-dark') {
      axios.post('http://localhost:8088/create-pdf-modern-dark', state)
        .then((response) => {
          downloadPdf(response.data.fileName);
        })
        .catch((error) => {
          toast.error("Failed to generate the report");
          console.error('Error generating PDF:', error);
        });
    } else if (selectedTemplate === 'classic') {
      axios.post('http://localhost:8088/create-pdf-classic', state)
        .then((response) => {
          downloadPdf(response.data.fileName);
        })
        .catch((error) => {
          toast.error("Failed to generate the report");
          console.error('Error generating PDF:', error);
        });
    }
  }  

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern-dark":
        return <ModernDarkTemplate state={state} formattedDate={formattedDate} createAndDownloadPdf={createAndDownloadPdf} />;
      case "classic":
        return <ClassicTemplate state={state} formattedDate={formattedDate} createAndDownloadPdf={createAndDownloadPdf} />;
      // Add more cases for additional templates
      default:
        return <ModernDarkTemplate state={state} formattedDate={formattedDate} createAndDownloadPdf={createAndDownloadPdf} />;
    }
  };

  return (
    <>
    
    <div style={{ textAlign: 'center', margin: '20px', zIndex: 10, position: 'relative' }}>
      <button
            style={styles.button}
            onClick={viewHistory}
          >
            View History
      </button>
      <label style={{ marginRight: '10px', fontSize: '18px', color: '#333' }}>Select Template: </label>
      <div style={{ position: 'relative', display: 'inline-block', width: '200px' }}>
        <select 
          onChange={(e) => setSelectedTemplate(e.target.value)} 
          value={selectedTemplate} 
          style={{
            width: '100%',
            padding: '10px 40px 10px 15px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '2px solid #ccc',
            backgroundColor: '#ffffff',
            color: '#333',
            cursor: 'pointer',
            appearance: 'none', /* Remove default dropdown arrow */
            outline: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', /* Add subtle shadow */
          }}
        >
          <option value="modern-dark">Modern Dark</option>
          <option value="classic">Classic</option>
          {/* Add more options for additional templates */}
        </select>

        <div style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          fontSize: '16px',
          color: '#999',
          zIndex: '1',
        }}>
          &#9662; {/* Custom dropdown arrow */}
        </div>
      </div>
    </div>
    

    {renderTemplate()}

    <ToastContainer position="top-center" />
  </>
  );
};

export default AnnualReport;
