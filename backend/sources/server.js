const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const db = require('./database/connection');
const authRouter = require('./routes/authRoutes');
const voucherRouter = require('./routes/voucherRoutes');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}

// express app
const app = express();
const port = process.env.PORT || 3000;

// cors
app.use(cors(corsOptions));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// endpoints
app.use('/api/auth/', authRouter);
app.use('/api/product/', voucherRouter);

// rendering express app
app.listen(port, () => {
    console.log(`server up and running on : http://localhost:${port}`);
});