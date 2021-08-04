import React, {ReactElement} from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Router from './routes';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App(): ReactElement {

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router/>
            </ThemeProvider>
        </MuiThemeProvider>
    )
}
