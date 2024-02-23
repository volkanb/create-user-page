import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import CreateUserForm from '../CreateUserForm/CreateUserForm';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CreateUserForm/>
        </ThemeProvider>
    );
}

export default App;
