import axios from "axios";
import React, { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    getusers();
  }, []);

  const getusers = () => {
    axios
      .get("http://ec2-15-228-23-22.sa-east-1.compute.amazonaws.com:3333/users")
      .then((response) => {
        console.log("entrou")
        setUsers(response.data)
    } )

     
      .catch((err) => console.log("err"));
  };
  return (
    <GlobalStateContext.Provider value={{users, setUsers}}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
