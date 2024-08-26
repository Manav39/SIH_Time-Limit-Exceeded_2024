import { createContext, useContext, useState } from "react";

const SIHContext = createContext(null);

export const useContract = () => useContext(SIHContext);

export const SIHProvider = (props) => {
  const [userType, setUserType] = useState("");
  const [authData, setAuthData] = useState([]);

  return (
    <SIHContext.Provider
      value={{
        userType,
        setUserType,
        setAuthData,
        authData,
      }}
    >
      {props.children}
    </SIHContext.Provider>
  );
};
