const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoute = require('./routes/userRoute');

const app = express();
dotenv.config({ path: path.join(__dirname, '.env.local') });

app.use(express.json());
app.use(cors());

app.use(userRoute.router);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started at ${process.env.PORT || 5000}`)
);
