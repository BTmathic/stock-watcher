const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes/api.js');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// back end API for getting stock data
apiRoutes(app);

app.listen(port, () => {
    console.log('Server is up!');
});