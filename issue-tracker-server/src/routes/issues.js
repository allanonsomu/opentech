const express = require('express');
const router = express.Router();
const { createIssue, fetchIssues } = require('../controllers/issueController');

// Define the route for creating an issue
router.post('/issues/create-issue', createIssue);

// Define the route for fetching issues
router.get('/issues/fetch-issues', fetchIssues);

module.exports = router;
