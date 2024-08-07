const express = require('express');
require('./config/config');
const cors = require('cors');

require('dotenv').config();


const app = express();
const router = require('./routers/userRouter')

app.use(cors());
app.use(express.json());

app.use('/api/v1', router)

const port = process.env.port;


app.listen(port, () =>{
    console.log(`This server is listening on port: ${port}`);
})