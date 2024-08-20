const express = require('express');
const emailRoutes = require('./email'); // Import the email routes
const app = express();

app.use(express.json());
app.use('/api', emailRoutes); // Use the email routes

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
