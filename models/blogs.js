const mongoose = require('mongoose');

//defining database schema
var blogSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
});

//creating model(collection)
module.exports = mongoose.model('blog', blogSchema);