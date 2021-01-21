const request = require('request');



const forecast = (lat, long, cb) => {
    const uriCoord = encodeURIComponent(lat + ',' + long);
    const url = `http://api.weatherstack.com/current?access_key=5931d1d2884f64acce7d533fb037c407&query=${uriCoord}&units=f`
    request({url, json: true}, (err, {body} = {}) =>{
        if(err){
            cb("Error getting weather data!");
        }else if(body.error){
            cb("Your search failed. Try another search...")
        }else{
            cb(undefined, 'Conditions: ' + body.current.weather_descriptions[0]+ ". It is currently " + body.current.temperature + " degrees out! Wind " + body.current.wind_dir + ", " + body.current.wind_speed + " mph." );
        }
    })

}


module.exports = forecast;