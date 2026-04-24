require('dotenv').config();
require('./database/db');

const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const express = require('express');
const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api', bookRoutes);


const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});