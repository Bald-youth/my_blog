"use strict";
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';
mongoClient.connect(url, function (err, db) {
    if (err)
        throw err;
    console.log("database已经创建");
    db.close();
});
