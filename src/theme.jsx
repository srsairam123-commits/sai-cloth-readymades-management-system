import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette:{

    primary:{
      main:"#4F46E5"
    },

    secondary:{
      main:"#7C3AED"
    },

    success:{
      main:"#16A34A"
    },

    error:{
      main:"#DC2626"
    },

    background:{
      default:"#F4F7FC"
    }

  },

  typography:{
    fontFamily:"Poppins, sans-serif",

    h4:{
      fontWeight:700
    },

    h5:{
      fontWeight:700
    },

    h6:{
      fontWeight:600
    }

  }

});

export default theme;