import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(() => ({
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        zIndex: 999,
        backgroundColor: '#e7e7e74f'
    }
}));
