import app from './app';
import https from 'https';
import httpsOptions from './infrastructure/middlewares/https_options';
// create server https
https.createServer(httpsOptions, app).listen(app.get('port'), () => {
    console.log('API running on environment: %s | port: %d', app.get('env'), app.get('port'));
});

