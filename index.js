const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const path = require('path');


// Middleware to parse JSON if needed (for POST/PUT later)
app.use(express.json());

// GET endpoint to return list from JSON
app.get('/dhaka-city-area', (req, res) => {
    fs.readFile('./dhaka.json', 'utf8', (err, data) => {
        if (err) {
            console.error('File read error:', err);
            return res.status(500).json({ error: 'Error reading data file.' });
        }
        try {
            const items = JSON.parse(data);
            res.json(items);
        } catch (parseErr) {
            console.error('JSON parse error:', parseErr);
            res.status(500).json({ error: 'Invalid JSON format in file.' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
