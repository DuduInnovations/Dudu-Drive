
var MongoClient = require('mongodb').MongoClient;
var db = require('mongodb').db

// url = "mongodb://192.168.99.100:27017"
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.createCollection("customers", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

// Connect to the db
MongoClient.connect("mongodb://192.168.99.100:27017/mydb", function (err, db) {
    
    db.collection('customers', function (err, collection) {
        
        collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
        
        

        db.collection('customers').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
                
});

