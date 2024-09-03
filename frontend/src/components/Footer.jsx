import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useTheme } from "../ThemeContext";
import { GoVerified } from "react-icons/go";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const footer = t("contacts");

  const footerClasses = `py-5 bg-${theme} text-${
    theme === "dark" ? "white" : "black"
  }`;
  const iconClasses = `fa-3x mb-3 text-${
    theme === "dark" ? "gray-500" : "muted"
  }`;
  const devfooter = "</> by ";

  return (
    <>
      <footer className={footerClasses}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mt-0 text-${theme === 'dark' ? 'white' : 'muted'}">
                {footer["title"]}
              </h2>
              <hr className="divider my-4" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
              <FaPhone className={iconClasses} />
              <div className="text-${theme === 'dark' ? 'white' : 'black'}">
                {footer["phoneNo"]}
              </div>
            </div>
            <div className="col-lg-4 mr-auto text-center">
              <FaEnvelope className={iconClasses} />
              <a className="d-block" href="mailto:reportgen@vjti.ac.in">
                {footer["email"]}
              </a>
            </div>
          </div>
        </div>
        <br />
        <div className="container"></div>
      </footer>
    </>
  );
};

export default Footer;
