import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#5471d2',
      main: '#0d46a0',
      dark: '#002071',
      contrastText: '#fff'
    }
  },
  custom: {
    color: {
      green: '#14c07b',
      teal: '#52c4ed'
    },
    screen: {
      maxWidth: '800px',
      maxWidthHome: '1200px',
      bodyPadding: '2rem'
    }
  }
})

export default theme
