const express = require('express');
const cors = require('cors');
require('dotenv').config();

const detailsRoutes = require("./routes/details.route")

const { getPems, verifyToken } = require('./middleware/auth');
getPems(process.env.COGNITO_USER_POOL_ID, process.env.COGNITO_REGION);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.get('/api/secure-data', verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}` });
});

// app.use("/api", sampleController);
app.use("/api", detailsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
