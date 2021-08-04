import {createTheme} from '@material-ui/core';

export default createTheme({
    overrides: {
        MuiCard: {
            root: {
                position: 'relative'
            }
        }
    }
});
