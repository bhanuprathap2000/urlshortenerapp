const mongoose =require('mongoose');

// mongoose.connect("mongodb://localhost:27017/urlshortener",{useNewUrlParser:true,useUnifiedTopology:true});

const urlSchema=mongoose.Schema({

  longUrl:{
      type:String,
      required:true
  },
  shorturl:{
      type:String,
      required:true
  }

});
//we need to pass collection name in singular
module.exports=mongoose.model("shorturl",urlSchema);
