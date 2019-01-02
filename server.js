var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 8080;

app.use('/static', express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/search', function(req, res){
    res.sendFile(path.join(__dirname + '/views/search.html'));
});
app.get('/file', function(req, res){
    res.sendFile(path.join(__dirname + '/views/file.html'));
});

// app.get('/public/assets/js/app', function(req, res){
//     res.sendFile(path.join(__dirname + '/public/assets/js/app'))
// })

app.listen(PORT, function(){
    console.log('App listening on localhost:' + PORT);
});