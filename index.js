const express = require('express');
const dotenv = require('dotenv');
const itemsRoute = require('./src/routes/items.js');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/api/items", itemsRoute);

app.get("/", (req, res) => {
  res.send("API server is running..");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
