const request = require('request');

const geocode = (address, cb) => {
    const URIaddress = encodeURIComponent(address);
    let url  = `https://api.mapbox.com/geocoding/v5/mapbox.places/${URIaddress}.json?limit=2&access_token=pk.eyJ1IjoicmFwdG9yaXVrYXMiLCJhIjoiY2tqdzlvcHFyMDd0cDJycHBuOTR1bmp2MyJ9.LT8SjufuHZP3YN28jENh_g`
    request({url, json: true}, (err, {body} = {})=>{
        if(err){
            cb("Unable to connect to location services!", undefined);
        }else if(body.features.length === 0){
            cb("Unable to find any locations with specified criteria!");
        }else{
            cb(undefined, {
                latitude: body.features[0].center[1], longitude: body.features[0].center[0], location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;