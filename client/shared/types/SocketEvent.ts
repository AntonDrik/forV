export const SocketEvent = {
    READER: {
        DATA: '/reader/status',
        CHECK: '/reader/check',
        INFO: '/reader/info'
    },
    VIDEO: {
        START: '/video/start',
        STOP: '/video/stop',
        ERROR: '/video/error',
        STREAM: '/video/stream/get',
        SHUTTER_DATA: '/video/shutter/data'
    },
    PHOTO: {
        CREATED: '/photo/created'
    },
    TIMELAPSE: {
        START: '/timelapse/start',
        TAG_DETECTED: '/timelapse/detected',
        STOP: '/timelapse/stop',
        SUCCESS: '/timelapse/success',
        ERROR: '/timelapse/error'
    },
    TAG: {
        APPEAR: '/tag/appear',
        DISAPPEAR: '/tag/disappear'
    },
    SERVICE: {
        MQTT: {
            STATUS: '/service/mqtt/status'
        },
        CAMERA: {
            STATUS: '/service/camera/status'
        },
        READER: {
            STATUS: '/service/reader/status'
        },
        AMAZON: {
            STATUS: '/service/amazon/status',
            QUEUE: '/service/amazon/queue'
        },
        MEMORY: {
            STATUS: '/service/memory/status',
            DATA: '/service/memory/data'
        },
        TEMPERATURE_SENSOR: {
            STATUS: '/service/temperature_sensor/status',
            DATA: '/service/temperature_sensor/data'
        }
    }
} as const;
