import React, {ReactElement, useEffect, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import VideoContainer from './components/VideoContainer/component';
import {BackDrop} from '@shared/components/BackDrop/component';
import {io, Socket} from 'socket.io-client';

let socket: Socket;

export default function VideoTab(): ReactElement {

    const [connected, setConnected] = useState<boolean>(false);

    const connectToSocketIO = () => {
        if (socket?.connected) {
            return;
        }
        socket = io(`http://192.168.31.51:5002/front`, {
            reconnection: true,
            reconnectionAttempts: 5
        });

        socket.once('data', (data) => {
            console.log(data);
            setConnected(true);
        });
    }

    const disconnectFromSocketIO = () => {
        socket?.close();
    }


    useEffect(() => {
        connectToSocketIO();
        return () => {
            disconnectFromSocketIO();
        };
    }, []);

    return <>
        {connected && <VideoContainer socket={socket}/>}
    </>
}
