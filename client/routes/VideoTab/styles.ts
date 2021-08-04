import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    root: {
        position: 'relative',
        width: 800,
        margin: '0 auto',
        display: 'flex'
    },
    rootExpanded: {
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    videoControls: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
}));
