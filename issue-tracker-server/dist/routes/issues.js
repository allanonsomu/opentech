"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/issueController'),
  createIssue = _require.createIssue,
  fetchIssues = _require.fetchIssues;

// Define the route for creating an issue
router.post('/issues/create-issue', createIssue);

// Define the route for fetching issues
router.get('/issues/fetch-issues', fetchIssues);
module.exports = router;