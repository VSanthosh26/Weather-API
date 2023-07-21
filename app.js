const express=require("express")
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    
    
})

app.post("/",function(req,res){
    console.log("thanks for using our website");
    const cityName=req.body.cityName;
    const apiKey=""
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID="+apiKey+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
              const weatherData=JSON.parse(data);
              const temp=weatherData.main.temp;
              const weatherDescription=weatherData.weather[0].description;
              const icon=weatherData.weather[0].icon;
              const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
              res.write("<p>The weather is currently "+ weatherDescription+"</p>")
              res.write("<h1>The temperature in "+cityName+" is "+temp+" degree celsius.</h1>");
              res.write("<img src="+imgurl+">")
              res.send();
        })
    })
})


app.listen(3000,function(req,res){
    console.log("server is connected and running on port 3000."); 
})
