import SerialPort from 'serialport';

export default class Serial {
    constructor(setStatus) {
        this.init();

        setInterval((function () {
            if (this.port === null) {
                this.find();
                setStatus('Waiting hardware...', true);
            } else {
                if (this.connection === null) {
                    this.open();
                    setStatus('Ready', false);
                } else {
                    if (!this.connection.isOpen) {
                        setStatus('Connection lost!', true);
                        this.init();
                    }
                }
            }
        }).bind(this), 3000);
    }

    init() {
        this.port = null;
        this.connection = null;
    }

    find() {
        SerialPort.list()
            .then(ports => {
                let port = ports.find(
                    p => /arduino/i.test(p.manufacturer) || /2341|2A03/i.test(p.vendorId)
                );

                if (typeof port !== 'undefined') {
                    this.port = port;
                }
            })
            .catch(err => console.error('Error: ', err.message));
    }

    open() {
        this.connection = new SerialPort(this.port.path);
    }

    cmd(cmdString, prop = null) {
        return new Promise((resolve, reject) => {
            let store = [];

            if (this.connection == null || !this.connection.isOpen) {
                reject(store);
            }


            if (prop != null) {
                cmdString += ' ' + prop;
            }

            this.connection.write(cmdString + '\n', (err) => {
                if (err) {
                    return console.error('Error: ', err.message);
                }
            });
            this.connection.on('data', (data) => {
                data.map(item => {
                    store.push(item);
                    if (item === 10) {
                        try {
                            resolve(JSON.parse(Buffer.from(store).toString()));
                        } catch (e) {
                            reject(e);
                        }
                    }
                });
            });

            this.connection.on('error', (e) => {
                reject(e);
            });
        });
    }
}