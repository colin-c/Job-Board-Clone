import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DisplayTable from './component/DisplayTable';
import Projection from './pages/ProjectionSelector';


const App = () => {

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='*' element={<NotFound />} />
                        <Route path='/display-notes' element={<DisplayTable />} />
                        <Route path='/projection' element={<Projection />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App