import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    root: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20,
        top: 40
    },
    sliderMaxLabel: {
        position: 'absolute',
        right: 75,
        bottom: '10px',
        color: 'black'
    }
}));
