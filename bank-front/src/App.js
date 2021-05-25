import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme";
import GlobalState from "./global/GlobalState";
import Router from "./routes/Router";


const App = () => {


  return (
    <ThemeProvider theme={theme}>
      <GlobalState>
        <Router />
      </GlobalState>
    </ThemeProvider>
  );
};

export default App;
