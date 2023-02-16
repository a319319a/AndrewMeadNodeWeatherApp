const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()
const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')
// console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const public_directory=path.join(__dirname,'../public')
const viewaPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


//Set up handlebar engine and views loaction
app.set('view engine','hbs')
app.set('views',viewaPath)
hbs.registerPartials(partialPath)


//set up static directory to serve
app.use(express.static('public'))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Home Page',
        name:'Amartya Mukhopadhyay'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Amartya Mukhopadhyay"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Amartya Mukhopadhyay",
        helptext:"Here is the help page and type your question in the inbox"
    })
})

app.get('help/*',(req,res)=>{
    res.render('404Page',{
        title:"404 Error",
        text:"OOps!! Help article is not found"
    })
})

app.get('/forecast',(req,res)=>{
    res.render('search',{
        title:"Weather Forecast",
        text:"OOps!! Help article is not found"
    })
})

app.get('/products',(req,res)=>{

    if (!req.query.address) {
       return  res.send({
            error:"Please provide some address"
        })
    }
    else
    {
        const address=req.query.address
        geoCode.GeolocationCoordinates(address,(error,{latitude,longitude,location}={})=>{
           if (error) {
            return res.send({
                error
            })
           }
           forecast.forecast(latitude,longitude,(error,data={})=>{
                if (error) {
                   return  res.send({
                        error
                    })
                }
                else
                {
                    return res.send({
                        temperature:data.temperature,
                        weather:data.weather_descriptions,
                        weather_icon:data.weather_icons,
                        latitude:latitude,
                        longitude:longitude,
                        products:location
                    })
                }
            })
        })
        
    }
})

app.get('*',(req,res)=>{
    res.render('404Page',{
        title:"404 Error",
        text:"OOps!! This page is not found"
    })
})

app.listen(3000,()=>{
    console.log('The server is up on port 3000')
})