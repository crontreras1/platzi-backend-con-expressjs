const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${ timestamp }, ${ req.method }, ${ req.url }, - IP: ${ req.ip }]`); 

  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${ timestamp }, res: ${ res.statusCode }, - ${ duration }]`);
  });

  next(); // Después de ejecutada la función con, next() permite pasar a la siguiente ejecución
};

module.exports = loggerMiddleware; 