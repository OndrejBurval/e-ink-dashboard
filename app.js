import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import pageRoutes from './routes/page.routes.js';

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.static('public'));

// Pages
app.use('/', pageRoutes);

export default app;
