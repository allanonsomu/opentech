const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const issueRoutes = require('./routes/issues');


// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', issueRoutes);

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
