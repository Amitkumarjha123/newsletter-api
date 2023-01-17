const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const https = require("https");

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

   var data ={
     members : [
       {
         email_address: email,
         status: "subscribed",
         merge_fields : {
	       FNAME: firstName,
	       LNAME: lastName
        }
      }
     ]
   };
   var jsonData = JSON.stringify(data);
   const url="https://us21.api.mailchimp.com/3.0/lists/c0024d1c5b";
   const options ={
     method : "POST",
     auth:"Amit:88b1b2a5867e8315c31b098c1a2a58e-us21"
   }
  const request = https.request(url,options,function(response){



     response.on("data", function(data){
       console.log(JSON.parse(data));
       var code=data.statusCode;
       if (code===200)
       {
         res.sendFile(__dirname + "/success.html");
       }
       else{
         res.sendFile(__dirname + "/failure.html");
       }
     });
   });
request.write(jsonData);
request.end();

});

app.post("/failure.html" , function (req,res){
res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function(){
  console.log("server running on port 3000");
});

//88b1b2a58467e8315c31b098c1a2a58e-us21
//c0024d1c5b
