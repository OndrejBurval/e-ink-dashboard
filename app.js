import express from 'express';

// Routes
import pageRoutes from './routes/page.routes.js';
import screenshotRoutes from './routes/screenshot.routes.js';

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.static('public'));

// Pages
app.use('/', pageRoutes);
app.use('/screenshot', screenshotRoutes);

export default app;
