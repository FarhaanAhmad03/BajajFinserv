const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Your personal information
const USER_ID = 'Farhaan Ahmad M A 190303';
const EMAIL = 'mr5079@srmist.edu.in';
const ROLL_NUMBER = 'RA2111027020007';

app.post('/bfhl', (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: 'Invalid input data' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);
    const lowercaseAlphabets = alphabets.filter(item => item.toLowerCase() === item);
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    let fileInfo = {
      file_valid: false,
      file_mime_type: null,
      file_size_kb: null
    };

    if (file_b64) {
      // In a real-world scenario, you'd implement proper file validation and processing here
      fileInfo = {
        file_valid: true,
        file_mime_type: 'application/octet-stream', // This is a placeholder
        file_size_kb: Math.round(file_b64.length * 0.75 / 1024) // Rough estimate of Base64 to bytes
      };
    }

    const response = {
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      ...fileInfo
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});