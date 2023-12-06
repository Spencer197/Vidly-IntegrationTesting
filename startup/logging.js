const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

//Configure Winston
module.exports = function() {
  winston.exceptions.handle(//handleExcptions depricated, updated with exceptions.handle()
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  //Add file transport with a filename
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));//Added 'new' to winston.transports
  //Add MongoDB transport
  const mongoDBTransport = new winston.transports.MongoDB({ 
    db: 'mongodb://localhost/vidly',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    level: 'info'
  });

  winston.add(mongoDBTransport);
};

// Export the configured logger
module.exports = winston;