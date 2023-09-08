const express = require('express');
const http = require('http');
const bfhlRoutes = require('./bfhlRoutes');

const app = express();

app.use(express.json());
app.use('/bfhl', bfhlRoutes);



http.createServer(app).listen(3000, () => {
    console.log(
      `Server started on port 3000`,
    );
});
