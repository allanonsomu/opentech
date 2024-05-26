const sql = require('mssql');
const dbConfig = require('../config/dbConfig');
const nodemailer = require('nodemailer');

// Existing createIssue function
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.log('Database Connection Failed! Bad Config: ', err);
  });

const createIssue = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { date, complainantName, complainantEmail, selectedCountry, selectedCategory, selectedConsultant, complaintTitle, text } = req.body;

    if (!date || !complainantName || !complainantEmail || !selectedCountry || !selectedCategory || !selectedConsultant || !complaintTitle || !text) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const query = `INSERT INTO Issues (date, complainantName, complainantEmail, selectedCountry, selectedCategory, selectedConsultant, complaintTitle, text)
    VALUES (@date, @complainantName, @complainantEmail, @selectedCountry, @selectedCategory, @selectedConsultant, @complaintTitle, @text)`;

    await pool.request()
      .input('date', sql.Date, date)
      .input('complainantName', sql.NVarChar, complainantName)
      .input('complainantEmail', sql.NVarChar, complainantEmail)
      .input('selectedCountry', sql.NVarChar, selectedCountry)
      .input('selectedCategory', sql.NVarChar, selectedCategory)
      .input('selectedConsultant', sql.NVarChar, selectedConsultant)
      .input('complaintTitle', sql.NVarChar, complaintTitle)
      .input('text', sql.NVarChar, text)
      .query(query);

    // Send email notification
    const transporter = nodemailer.createTransport({
      // Your email configuration
      // For example, Gmail SMTP
      service: 'gmail',
      auth: {
        user: 'allanonsomu@gmail.com',
        pass: 'lrrqsgybtqilqbsn'
      }
    });

    const mailOptions = {
      from: 'allanonsomu@gmail.com',
      to: complainantEmail,
      subject: 'Issue Saved Notification',
      text: 'Your issue has been successfully saved.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Issue created successfully' });
  } catch (error) {
    console.error('Error creating issue:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// New function to fetch issues
const fetchIssues = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Issues');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createIssue,
  fetchIssues
};
