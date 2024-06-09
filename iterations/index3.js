// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//--------------------- custom code

app.get( "/api/:date", // parameters embedded in :path
  function( req, res ) {
      let date = req.params.date;
      //console.log(date);     

      // selection parameters
      var num_date = Number(date); // in milliseconds
      var unix_time = Date.parse(date);

      // output date format
      if( !isNaN(num_date) ) {
        console.log( "number" );
        //console.log(num_date);

        var num2date = new Date(num_date);
        //console.log(num2date);
        var date_utc = num2date.toUTCString();
        //console.log(date_utc);

        var output = {
          'unix': num_date,
          'utc': date_utc
        };
        console.log(output);
      
      // output date format
      } else if( !isNaN(unix_time) ) { 
        var unix_time = Date.parse(date);
        console.log( "text" );
        //console.log(unix_time);

        var date_format = new Date(unix_time);
        //console.log(date_format);   
        var date_utc = date_format.toUTCString();
        //console.log(date_utc);  
        
        let output = {
          'unix': unix_time,
          'utc': date_utc
        };
        console.log(output);

      // Bad input 
      } else {
        var output = { error : "Invalid Date" };
        console.log(output);
      }

      // add callback
      res.send( {'input': "number"} );
  }
);

//--------------------- boilerplate

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
