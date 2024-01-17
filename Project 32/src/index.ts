import { config } from 'dotenv';
import { startServer } from './server';

config();
startServer(process.env.PORT || 50051, console);
