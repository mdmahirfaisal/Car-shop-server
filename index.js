const express = require('express')
const { MongoClient } = require('mongodb');
// const admin = require("firebase-admin");

const app = express()
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000



// middle ware 
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Super Car Shop  "API"   Here')
})

app.listen(port, () => {
    console.log(` listening ${port}`)
})