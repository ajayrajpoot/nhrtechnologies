var express = require('express');
var app = express();
var mongoose = require('mongoose');

const cors = require('cors');
var bodyParser = require('body-parser');

var routes = require('./routes/routes');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send('cors problem fixed:)');
});

app.get('/', function (req, res) {
    res.send('start');
})

app.use('/api/', routes);


app.listen(8080, function () {
    console.log("Server Create http://localhost:8080");
});

// mongoose
//     .connect(
//         // 'mongodb+srv://ajtest:J9Xv169XWFbkSoQT@cluster0.b2p29.mongodb.net/test?retryWrites=true'
//         'mongodb://localhost:27017/nhrtechnologies', { }
//     );

mongoose.connect("mongodb://0.0.0.0:27017").then(() => {
    console.log("database connected")

    var server = app.listen(8082, () => {
        console.log(">>>>")
    });
    console.log("Server Create http://localhost:8082");

}).catch((err) => {
        console.log("error while connecting to database", err)
    })




