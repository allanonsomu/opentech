"use strict";

var dbConfig = {
  user: 'admin',
  password: 'allanonsomu2020',
  server: 'database-1.cra4wicognzl.eu-north-1.rds.amazonaws.com',
  // Specify the SQL Server instance
  database: 'IssueTrackerDB',
  options: {
    encrypt: false,
    // Set to true if using Azure SQL Database
    enableArithAbort: true
  }
};
module.exports = dbConfig;