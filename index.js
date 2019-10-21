const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
process.env.NODE_ENV = 'production';
app.use(express.static('/build/index.html'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoutes = require('./server/routes/authApi.js');
const apiRoutes = require('./server/routes/entryFormApi.js');
const gridRoutes = require('./server/routes/gridApi.js');

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('build'));
   const path = require('path');
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname,'build', 'index.html'));
   });
}
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/grid', gridRoutes);

//start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
