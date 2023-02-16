const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const tempUrl='http://api.weatherstack.com/current?access_key=bf9e66d68519c59a7f9f8c6f3ef78192&query='+latitude+', '+longitude
    console.log(tempUrl)
    request({url:tempUrl,json:true},(error,response)=>{
        if (error) {
            callback('Unable to find weather forecast',undefined)
        }
        else if(response.body.success===false)
        {
            callback('Weather forecast not available!..',undefined)
        }
        else
        callback(undefined,response.body.current)
    })
}

// forecast(22.362951,88.362951,(error,data)=>{
//     console.log('Error',error)
//     console.log('Data',data)
// })

module.exports={forecast}