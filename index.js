const path = require('path');
const Service = require('node-windows').Service;
const EventLogger = require('node-windows').EventLogger;

// Create a new service object
const instance = new Service({
    name: 'Verdaccio',
    description: 'The nodejs.org example web server.',
    script: path.join(__dirname, 'start.js')
});

// Create a new logger instance
const log = new EventLogger(instance.name);

// Listen for the "install" event, which indicates the
// process is available as a service.
instance.on('install', () => instance.start());

// Listen for the "start" event and let us know when the
// process has actually started working.
instance.on('start', () => {
    const message = `${instance.name} started!\nVisit http://localhost:4873 to see it in action.`;
    log.info(message, 1002, () => console.log(message));
});

// Install the script as a service.
instance.install();
