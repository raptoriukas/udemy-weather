const request = require('request');

let units = "f";

const forecast = (lat, long, cb) => {
    const uriCoord = encodeURIComponent(lat + ',' + long);
    const url = `http://api.weatherstack.com/current?access_key=5931d1d2884f64acce7d533fb037c407&query=${uriCoord}&units=${units}`
    request({url, json: true}, (err, {body} = {}) =>{
        if(err){
            cb("Error getting weather data!");
        }else if(body.error){
            cb("Your search failed. Try another search...")
        }else{
            console.log(body.current);
            units = units === 'm' ? 'C' : 'f';
            cb(undefined, 'Conditions: ' + body.current.weather_descriptions[0]+ ". It is currently " + body.current.temperature + " degrees out! Wind " + body.current.wind_dir + ", " + body.current.wind_speed + " mph. Feels like temp: " + body.current.feelslike + " " + units );
        }
    })

}


module.exports = forecast;