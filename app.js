const { urlencoded } = require("express");
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const mainRoutes=require("./routes/url");

const app=express();

//Serving the static files.
app.use(express.static("public"));

//This is a middle which parses through the request body and attach it to req so that we can use the req.body.
app.use(bodyParser.urlencoded({extended:true}));

//Setting the view engine.
app.set("view engine","ejs");

//Main routes.

app.use(mainRoutes);


app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server Started at port ${process.env.PORT}.`);
});
