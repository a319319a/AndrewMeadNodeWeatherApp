const request=require('request')


const GeolocationCoordinates=(address,callback)=>{
   const geoUrl='https://api.geoapify.com/v1/geocode/search?text='+address+'&format=json&apiKey=d548c5ed24604be6a9dd0d989631f783'
   console.log(geoUrl) 
   request({url:geoUrl,json:true},(error,response)=>{
        if (error) {
            console.log('Unable to find the location')
            callback('Unable to find the location!',undefined)
        } else if(response.body.results.length===0){
            callback('Unable to find the location. Try another search!!',undefined)
        }
        else
        {
            callback(undefined,{
                'latitude':response.body.results[0].lat,
                'longitude':response.body.results[0].lon,
                'location':response.body.results[0].formatted
            })
        }
    })
}

// GeolocationCoordinates('kolkata',(error,{latitude,longitude,location}={})=>{
//     console.log('Error',error);
//     console.log('latitude',latitude);
//     console.log('longitude',longitude);
//     console.log('location',location);
// })

module.exports={GeolocationCoordinates}