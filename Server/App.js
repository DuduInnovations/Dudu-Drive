var express = require('express'),
    app = express(),
    http = require('http').Server(app).listen(80),
    upload = require('express-fileupload');
app.use(upload())

console.log("Server Started");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', (req, res) => {
    if (req.files) {
        var file = req.files.filename,
            filename = file.name;

        //the first argument is the path where we want to store the file
        file.mv('./Uploads/' + filename, err => {
            if (err) {
                console.log(err)
                res.send("Error!")
            }
            else {
                res.send('DONE!')
            }
        });
    }
});

