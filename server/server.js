const express = require('express');

const app = express();
const PORT = 3000;

const planets = [
    { id: 1, name: 'Mercury' },
    { id: 2, name: 'Venus' },
    { id: 3, name: 'Earth' },
    // Add more planets as needed
  ];

app.get('/api/planets', (req, res) => {
    res.json(planets);
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});