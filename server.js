const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();


hbs.registerHelper('currentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamit',(text) => {
    return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/Public'));

app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}:${req.method} ${req.url}`;
console.log('log' + '\n',log);
fs.appendFile('server.log', log +'\n', (err) => {
    if (err) {
        console.log('unable to connect');
    }
    next();
});
});

app.get('/', (req, res) =>{
    // res.send('<h1> Hello Express <h1> ');
    // res.send({
    //     name: "andaloes",
    //     likes:[
    //         "biking",
    //         "cities"
    //     ],
    // });
    res.render('./home.hbs',{
        pageTitle:"HOME",
        welcomeMessage:"welcome to my website"
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle:"About US",
    });
});

app.get('/bad', (req,res) => {
   try {
       res.send({
           name: "andaloes",
           likes: city
       });
   } catch (errorMessage) {
       console.log("errorMessage");
       res.send('<h1> bad page with error Message oh yeah<h1>');
   } 

});


app.listen(port, () => { 
    console.log(`server is up at port ${port}`);
});
