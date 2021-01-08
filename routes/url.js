const express=require("express");
const router=express.Router();
//This is equivalent to the collection.
const shortUrl=require("../models/datahandler");
const shortId=require("shortid");



router.get("/",(req,res)=>{

    res.render("index");
    console.log(`${req.hostname}:${process.env.PORT || 3000}/bhanu`);

});





router.post("/", (req,res)=>{

    


    const {url}=req.body;
    console.log(url);
    console.log("---After the url---");
    //creating the new document.
    
    shortUrl.findOne({longUrl:url},(err,data)=>{

        try {
            //There was problem which was wrong name while passing it to render method.
            console.log("Found");
            const surl=data.shorturl;
            // const shorturl=`${req.hostname}:${process.env.PORT}/bhanu`;
            const shorturl=`/bhanu/${surl}`;


            // const shorturl=`http://127.0.0.1:3000/bhanu/${surl}`;

            res.render("shorturl",{shorturl:shorturl});
            

            
        } catch (error) {

            //This part is inside catch because we want to save it our database only if longurl is not present else show the short link for that.
            console.log("Not found Saving it!.");
            let smallurl =new shortUrl({
                longUrl:url,
                shorturl:shortId.generate()
            });
        
            smallurl.save((err)=>{
                
                try { 
                    shortUrl.findOne({longUrl:url},(err,data)=>{
                        try {
                            // console.log(data);
                            const surl=data.shorturl;
                            // const shorturl=`https://${req.hostname}:${process.env.PORT}/bhanu/${surl}`;
                            // const shorturl=`${req.hostname}/bhanu/${surl}`;
                            const shorturl=`/bhanu/${surl}`;

                            console.log(`__________hi_________`);
                            console.log(shorturl);

                            // const shorturl=`http://127.0.0.1:3000/bhanu/${surl}`;
            
                            res.render("shorturl",{shorturl:shorturl})
                            // res.send(`This is the short url <a>${shorturl}</a>`);
                            //  console.log(shorturl);
                            //  console.log(surl);
            
                               
                           } catch (error) {
                               console.log(error);
                               
                           }
                        
                    });      
                    // console.log('saved');
                    
                } catch (error) {
                    console.log(error);
                    
                }
    
    
            });
            
        }

    });

   


});


console.log("This is after the post one.")


router.get(`/bhanu/:code`,(req,res)=>
{
    // https://urlshortenerappbhanu.herokuapp.com:${process.env.PORT}/bhanu/:code
    // https://urlshortenerappbhanu.herokuapp.com:49920/bhanu/j0nhaoV9O
    // https://urlshortenerappbhanu.herokuapp.com:50811/bhanu/mAPDfqgkN
    const surl=req.params.code;
    console.log(surl);
    console.log("Now present in the redirect");

    shortUrl.findOne({shorturl:surl},  (err,data)=>{
    try {

        const lurl=data.longUrl;
        res.redirect(lurl);


        
    } catch (error) {

        console.log(error);
        
    }
     



    })


  


});



module.exports=router;