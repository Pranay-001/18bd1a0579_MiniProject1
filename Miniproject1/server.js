const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HandlerGenerator = new require('./HandlerGenerator');
const handlers = new HandlerGenerator();

const app = express();
const url = "mongodb://localhost/HospitalInventory"
app.use(express.json())

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Connected');
});

app.use(bodyParser.urlencoded({ // Middleware
    extended: true
}));

app.use(bodyParser.json());

// Routes & Handlers
app.post('/login', handlers.login);

const hospitalData = require('./routers/Hospital')
app.use('/hospitaldata', hospitalData)

const ventilatorData = require('./routers/Ventilator')
app.use('/ventilatordata', ventilatorData)

app.listen(3000, () => {
    console.log("Server Started at port no. : 3000");
});
