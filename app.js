const dataRouter = require('./routes/data');
const express = require('express');
const app = express();
const port = 3000;

app.use('/data', dataRouter);

app.listen(port, () => {
    console.log(`Listening ...`);
});