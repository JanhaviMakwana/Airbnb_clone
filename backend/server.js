const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./app/config/app.config');
const auth = require('./app/middleware/auth');
const authRoutes = require('./app/routes/auth');
const propertyRoutes = require('./app/routes/property');
const orderRoutes = require('./app/routes/order');
const PORT = config.appPort || 8080;

const app = express();

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(authRoutes);
require('./app/middleware/imageUpload')(app);
app.use(auth);
app.use(propertyRoutes);
app.use(orderRoutes);

app.post('/post-image', (req, res, next) => {
     if (!req.isAuth) {
         throw new Error('Not authenticated!');
     }
     if (!req.file) {
         return res.status(200).json({ message: 'No file provided!' });
     }
    /*  if (req.body.oldPath) {
         clearImage(req.body.oldPath);
     } */

   /*  console.log(req.file); */
    return res.status(201).json({ message: 'File stored.', filePath: req.file.path });
    
});

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    })