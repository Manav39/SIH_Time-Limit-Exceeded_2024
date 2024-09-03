import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'en',
    returnObjects: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          home: {
            title: 'Automated and Integrated Report Portal',
            description: 'Creating dynamic reports on the fly',
            button1: 'FIND OUT MORE',
            button2: 'LOGIN',
            button3: 'Admin Dashboard',
          },
          features: {
            title: 'Our Features',
            description:
              'Efficiently manages educational records through a unified platform with streamlined submission, review, and reporting processes.',
            card1: 'Centralised and Automated Solutions',
            card2: 'Automated Reporting',
            card3: 'Data Integration',
            card4: 'AI report generation and summary',
          },
          contacts: {
            title: 'Contact Us',
            phoneNo: '(+91) 1234567890',
            email: 'reportgen@vjti.ac.in',
          },
          navbar: {
            opt1: 'Home',
            opt2: 'Forums',
            opt3: 'About',
            opt4: 'Login',
          },
          about: {
            title: 'About Us',
            description:
              "The platform's features—including user authentication, achievement submission, review workflows, notifications, and automatic reporting—are well-aligned with operational requirements, effectively enhancing the management of educational records. Efficiently manages educational records through a unified platform with streamlined submission, review, and reporting processes. Generates reports with real-time data integration, reducing manual effort and enhancing accuracy.",
          },
          auth: {
            title: 'Create Account',
            name: 'Name',
            email: 'Email',
            password: 'Password',
            dept: 'Department',
            role: 'Role',
            createAcc: 'Create Account',
            login: 'Login',
            loginTitle: 'Login Account',
            donthaveaccount: "Don't have an account?",
            here: 'Sign up here',
          },
          adminSidebar: {
            admin: 'Admin',
            report: 'Report',
            events: 'Events',
            publications: 'Publications',
            departments: 'Departments',
            users: 'Users',
          },
          'Dashboard.js': {
            Dashboard: 'Dashboard',
            Alumni: 'Alumni',
            Total: 'Total',
            'Forum Topics': 'Forum Topics',
            'Posted Jobs': 'Posted Jobs',
            Now: 'Now',
            'Upcoming Events': 'Upcoming Events',
            'Amount Donated': 'Amount Donated',
            Courses: 'Courses',
            Admin: 'Admin',
            Report: 'Report',
            Events: 'Events',
            Publications: 'Publications',
            Departments: 'Departments',
            Users: 'Users',
          },
        },
      },
      hi: {
        translation: {
          home: {
            title: 'स्वचालित और एकीकृत रिपोर्ट पोर्टल',
            description: 'रियल-टाइम में डायनेमिक रिपोर्ट तैयार करें',
            button1: 'और जानें',
            button2: 'लॉगिन करें',
            button3: 'एडमिन डैशबोर्ड',
          },
          features: {
            title: 'हमारी विशेषताएं',
            description:
              'एकीकृत प्लेटफ़ॉर्म के माध्यम से शैक्षिक रिकॉर्ड को प्रभावी ढंग से प्रबंधित करता है, जिसमें सबमिशन, समीक्षा और रिपोर्टिंग प्रक्रियाओं को सरल बनाया गया है।',
            card1: 'केंद्रित और स्वचालित समाधान',
            card2: 'स्वचालित रिपोर्टिंग',
            card3: 'डेटा एकीकरण',
            card4: 'एआई रिपोर्ट जनरेशन और सारांश',
          },
          contacts: {
            title: 'संपर्क करें',
            phoneNo: '(+91) 1234567890',
            email: 'reportgen@vjti.ac.in',
          },
          navbar: {
            opt1: 'होम',
            opt2: 'फोरम्स',
            opt3: 'हमारे बारे में',
            opt4: 'लॉगिन',
          },
          about: {
            title: 'हमारे बारे में',
            description:
              'प्लेटफ़ॉर्म की विशेषताएं—उपयोगकर्ता प्रमाणीकरण, उपलब्धि सबमिशन, समीक्षा वर्कफ़्लो, सूचनाएं, और स्वचालित रिपोर्टिंग—ऑपरेशनल आवश्यकताओं के साथ अच्छी तरह से मेल खाती हैं, जो शैक्षिक रिकॉर्ड के प्रबंधन को प्रभावी ढंग से बढ़ाती हैं। एकीकृत प्लेटफ़ॉर्म के माध्यम से शैक्षिक रिकॉर्ड को प्रभावी ढंग से प्रबंधित करता है, जिसमें सबमिशन, समीक्षा और रिपोर्टिंग प्रक्रियाओं को सुव्यवस्थित किया गया है। वास्तविक समय में डेटा एकीकरण के साथ रिपोर्ट तैयार करता है, जिससे मैन्युअल प्रयासों में कमी आती है और सटीकता में सुधार होता है।',
          },
          auth: {
            title: 'खाता बनाएं',
            name: 'नाम',
            email: 'ईमेल',
            password: 'पासवर्ड',
            dept: 'विभाग',
            role: 'भूमिका',
            createAcc: 'खाता बनाएं',
            login: 'लॉगिन',
            loginTitle: 'खाता लॉगिन करें',
            donthaveaccount: 'क्या आपके पास खाता नहीं है?',
            here: 'यहां साइन अप करें',
          },
          adminSidebar: {
            admin: 'प्रशासक',
            report: 'रिपोर्ट',
            events: 'घटनाएँ',
            publications: 'प्रकाशन',
            departments: 'विभाग',
            users: 'उपयोगकर्ता',
          },
          'Dashboard.js': {
            Dashboard: 'डैशबोर्ड',
            Alumni: 'पूर्व छात्र',
            Total: 'कुल',
            'Forum Topics': 'फोरम विषय',
            'Posted Jobs': 'प्रकाशित नौकरियां',
            Now: 'अब',
            'Upcoming Events': 'आगामी कार्यक्रम',
            'Amount Donated': 'दान राशि',
            Courses: 'पाठ्यक्रम',
            Admin: 'प्रशासन',
            Report: 'रिपोर्ट',
            Events: 'कार्यक्रम',
            Publications: 'प्रकाशन',
            Departments: 'विभाग',
            Users: 'उपयोगकर्ता',
          },
        },
      },
      mr: {
        translation: {
          home: {
            title: 'स्वयंचलित आणि एकत्रित अहवाल पोर्टल',
            description: 'रिअल-टाइममध्ये डायनॅमिक अहवाल तयार करा',
            button1: 'अधिक जाणून घ्या',
            button2: 'लॉगिन करा',
            button3: 'प्रशासक डॅशबोर्ड',
          },
          features: {
            title: 'आमच्या वैशिष्ट्ये',
            description:
              'सादरीकरण, पुनरावलोकन आणि अहवाल प्रक्रिया सुव्यवस्थित करून एकत्रित प्लॅटफॉर्मद्वारे शैक्षणिक नोंदी कार्यक्षमतेने व्यवस्थापित करते.',
            card1: 'केंद्रीकृत आणि स्वयंचलित सोल्यूशन्स',
            card2: 'स्वयंचलित रिपोर्टिंग',
            card3: 'डेटा एकत्रीकरण',
            card4: 'एआय अहवाल निर्मिती आणि सारांश',
          },
          contacts: {
            title: 'संपर्क करा',
            phoneNo: '(+91) 1234567890',
            email: 'reportgen@vjti.ac.in',
          },
          navbar: {
            opt1: 'मुख्यपृष्ठ',
            opt2: 'फोरम्स',
            opt3: 'आमच्याबद्दल',
            opt4: 'लॉगिन',
          },
          about: {
            title: 'आमच्याबद्दल',
            description:
              'प्लॅटफॉर्मची वैशिष्ट्ये—वापरकर्ता प्रमाणीकरण, यश साध्य सादर करणे, पुनरावलोकन कार्यप्रवाह, सूचना आणि स्वयंचलित अहवाल—ऑपरेशनल आवश्यकता उत्तम प्रकारे जुळतात, ज्यामुळे शैक्षणिक नोंदींचे व्यवस्थापन प्रभावीपणे वाढते. सादरीकरण, पुनरावलोकन आणि अहवाल प्रक्रियेला सुव्यवस्थित करून एकत्रित प्लॅटफॉर्मद्वारे शैक्षणिक नोंदी कार्यक्षमतेने व्यवस्थापित करतो. वास्तविक वेळेत डेटा एकत्रीकरणासह अहवाल तयार करतो, ज्यामुळे मॅन्युअल प्रयत्न कमी होतात आणि अचूकता वाढते.',
          },
          auth: {
            title: 'खाते तयार करा',
            name: 'नाव',
            email: 'ईमेल',
            password: 'पासवर्ड',
            dept: 'विभाग',
            role: 'भूमिका',
            createAcc: 'खाते तयार करा',
            login: 'लॉगिन',
            loginTitle: 'खाते लॉगिन करा',
            donthaveaccount: 'तुमच्याकडे खाते नाही का?',
            here: 'येथे साइन अप करा',
          },
          adminSidebar: {
            admin: 'प्रशासक',
            report: 'अहवाल',
            events: 'कार्यक्रम',
            publications: 'प्रकाशने',
            departments: 'विभाग',
            users: 'वापरकर्ते',
          },
          'Dashboard.js': {
            Dashboard: 'डॅशबोर्ड',
            Alumni: 'माजी विद्यार्थी',
            Total: 'एकूण',
            'Forum Topics': 'मंच विषय',
            'Posted Jobs': 'पोस्ट केलेल्या नोकर्‍या',
            Now: 'आता',
            'Upcoming Events': 'आगामी कार्यक्रम',
            'Amount Donated': 'दान केलेली रक्कम',
            Courses: 'कोर्सेस',
            Admin: 'प्रशासन',
            Report: 'अहवाल',
            Events: 'कार्यक्रम',
            Publications: 'प्रकाशने',
            Departments: 'विभाग',
            Users: 'वापरकर्ते',
          },
        },
      },
    },
  })

export default i18n
