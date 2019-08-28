

import {createMuiTheme } from '@material-ui/core/styles';




const theme = createMuiTheme({

  overrides: {
    MuiFormControlLabel: {
        label: {
            fontSize: '0.875rem',
        }
    }
  },


  palette: {

    
    primary: {        
        main:'#00bcd4',
        contrastText: '#fff',
    },
    secondary: {
      main:'#f9c700',
      contrastText: '#515151'
    },
   error: {main:'#ca0909' },


     status:{
         danger:'#b71c1c'
     },

    
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export default theme