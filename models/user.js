//require mongoose to use the package
const mongoose = require('mongoose');

//define the schema properties (mongoose equivlent of SQL tables)
const userSchema = new mongoose.Schema({
    username: String,
    note: String,
    class: String,
    spec: String,
    softresd: String,
});

//create a a new collection in the DB, store it to a js object for export
const user = mongoose.model('User', userSchema);

//export the schema to be used in other files
module.exports = user;