const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const port = 8888;
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('A Jobthing : Indra Octama live on : http://localhost:' + port);
    });
})
