const dbConfig = {
  user: 'allanonsomu',
  password: 'allanonsomu2020',
  server: 'localhost\\SQLEXPRESS', // Specify the SQL Server instance
  database: 'IssueTrackerDB',
  options: {
      encrypt: false, // Set to true if using Azure SQL Database
      enableArithAbort: true
  }
};

module.exports = dbConfig;
