import { createTheme, ThemeProvider } from '@mui/material'
import { Header } from './components/Header'
import { MainArea } from './components/MainArea'

const App = () => {
  const muiTheme = createTheme({
    typography: {
      fontFamily: 'system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
    },
  })

  return (
    <div className="App">
      <ThemeProvider theme={muiTheme}>
        <Header />
        <MainArea />
      </ThemeProvider>
    </div>
  )
}

export default App
