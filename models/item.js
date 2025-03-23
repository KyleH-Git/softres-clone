//require mongoose to use the package
const mongoose = require('mongoose');

//define the schema properties (mongoose equivlent of SQL tables)
const itemSchema = new mongoose.Schema({
    name: String,
    restricted: Boolean,
    slot: String,
    ilvl: Number,
    from: String,
    softResdBy: String,
});

//create a a new collection in the DB, store it to a js object for export
const item = mongoose.model('Items', itemSchema);

//export the schema to be used in other files
module.exports = item;