const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

// Define paths for express config
const publicPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup server to serve static files and location
app.use(express.static(publicPath));


app.get('/', (req, res) => {
    res.render('index', {
        title : "Weather App",
        name: "Arnold"
    });
});


app.get('/about', (req, res) => {
    res.render('about', {title: "About page", name: "Arnold"});
});

app.get('/help', (req, res, next) => {
    res.render('help', {title: 'Help',message: "We're busy please don't bother at the moment...", name: "Arnold"});
});



app.get('/weather', (req, res) => {
 
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'Error. You must provide an address...'
        });
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast,
                location,
                address
            })
        });

        
    })
});

app.get('/products', (req, res) => {
    if(req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    });
    
});

app.get('/help/*', (req, res) => {
    res.render("notfound", {title: "404 Help page not found", errorMessage: "Help Page not found!", name: "Arnold"});
});

app.get('*', (req, res) => {
    res.render("notfound", {title: "404 page not found", errorMessage: "Page not found!", name: "Arnold"});
});





app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

