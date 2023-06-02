const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
    const query=req.body.cityname;
    const apiKey="a961646b0c87a8a19a123cff7476259b";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temperature=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<p> "+weatherDescription+" <p");
            res.write("<h1>The tempearture in "+query+" is "+temperature+" degree celcius</h1>");
            res.write("<img src="+imgUrl+">");
            res.send()
            
        })

  })
    
})



app.listen(3000,function(){
    console.log("server running at port 3000")
})