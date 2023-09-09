const mongoose = require("mongoose");

mongoose.connection.db.collectionNames(function (err, names)
{
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
}

