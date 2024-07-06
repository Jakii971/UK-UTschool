const express = require('express');
const app = express();
const cors = require('cors')
const path = require("path");
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const kategoriController = require('./controllers/kategoriController');
const subkategoriController = require('./controllers/subkategoriController');
const paketController = require('./controllers/paketController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }))
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api', userController);

app.use('/api', kategoriController);
app.use('/api', subkategoriController);
app.use('/api', paketController);



app.listen(process.env.PORT, () => console.log(`Express JS server running on port ${process.env.PORT}`));