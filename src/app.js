const express = require('express');
const routes = require('./routes');
const cors = require('cors');

require('dotenv/config')

const mongoose = require('mongoose')
const app = express();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
)  


app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(process.env.PORT || 3333 )