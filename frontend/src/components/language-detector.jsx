import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "हिंदी" },
  { code: "mr", lang: "मराठी" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLang = (value) => {
    console.log(value);
    i18n.changeLanguage(value);
  };

  const selectStyle = {
    padding: "8px", // Slightly reduced padding
    border: "1px solid #666",
    borderRadius: "4px",
    backgroundColor: "#000", // Black background
    color: "#fff", // White text
    fontSize: "14px",
    cursor: "pointer",
    width: "150px", // Reduced width
    transition: "border-color 0.3s ease",
  };

  return (
    <select onChange={(e) => changeLang(e.target.value)} style={selectStyle}>
      {languages.map((language) => (
        <option key={language.code} value={language.code}>
          {language.lang}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
