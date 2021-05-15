//Importing Express
var express = require('express');
const app = express();

//Importing Routes
const indexRoutes = require('./routes/index');

//setting Up View Engine....
app.set('view engine', 'ejs');

//serving Public Folder
app.use(express.static('public'));

//Importing body-Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

// Importing method-override to override the POST method to PUT and DELETE method
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Connecting To Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("----Database Connected----");
}).catch((err) => {
    console.log("----Database Connection Error!!!----");
});


//routes
app.use(indexRoutes);


app.listen(4000, () => {
    console.log("-----Server Started at port : 4000----");
});