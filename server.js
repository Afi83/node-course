const express = require('express');
const hbs = require("hbs");
const fs = require("fs");


var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs");

//Middleware to run codes that express does not support
// these run in order so if is not up the static should not be available so the 
// static filers should be down the maintenance


app.use((req, res, next) => {
    var now = new Date();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});
/*
app.use((req, res, next) => {
    res.render("maintenance.hbs");
});*/
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

/*app.get('/', (req, res) => {
   // res.send('<h1>Hello Express</h1>');
   res.send({
       name: 'afshin',
       likes: [15]
   })
});*/

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'about page',
        welcomeMsg: "Welcome to handlebars server"
    })
 });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request, No data!'
    });
});

app.listen(3000);