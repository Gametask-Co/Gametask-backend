import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Umbler listening on port %s', port);
});
