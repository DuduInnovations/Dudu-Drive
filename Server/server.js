var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');

app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


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

