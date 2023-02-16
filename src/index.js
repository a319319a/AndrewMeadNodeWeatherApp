// const fetch=require('node-fetch')
fetch('https://api.geoapify.com/v1/geocode/search?text=kolkata&format=json&apiKey=d548c5ed24604be6a9dd0d989631f783').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})