import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import {
  secundaryColorText,
  primaryColor,
  neutralColor,
  backgroundColor,
  backgroundColorCard,
  contrastColorText,
} from "./colors";

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: contrastColorText,
    },
    background: {
      default: backgroundColor,
      paper: backgroundColorCard,
    },
    text: {
      primary: neutralColor,
      secondary: secundaryColorText,
      disabled: "white",
    },
    action: {
      disabled: "white",
      active: "rgba(0, 0, 0, 0.54)",
    },
  },
});

const themeda = responsiveFontSizes(theme2);

export default themeda;
