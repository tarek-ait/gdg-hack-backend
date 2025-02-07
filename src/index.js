import {app} from './app.js';
import dotenv from 'dotenv';
import initDB from './db/init.js'; 

dotenv.config();

try {
    await initDB();
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}