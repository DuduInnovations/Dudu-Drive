var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var crypto = require('crypto');
var cors = require('cors');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var methodOverride = require('method-override');
var MongoClient = require('mongodb').MongoClient;

app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

//app.use(bodyParser.json());
//app.use(methodOverride('_method'));

// Mongo URI, use port you choose for docker container
//const mongoURI = 'mongodb://localhost:57838/mongouploads';


//create upload instance and receive single file
var upload = multer({ storage: storage }).array('file');


//post route to upload a file
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.body.file)
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.body.file)
    })
    console.log(storage)
});


app.listen(8000, function () {
    console.log('App running port 8000');
});

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
    
    db.collection('Persons', function (err, collection) {
        
        collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
        
        

        db.collection('Persons').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
                
});

