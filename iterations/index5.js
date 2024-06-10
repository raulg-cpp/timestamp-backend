// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//---------------- custom code ----------------

app.get( "/api/:date", // parameters embedded in :path
  function( req, res ) {
      // selection parameters
      let date = req.params.date;
      var num_date = Number(date); // in milliseconds
      var unix_time = Date.parse(date);

      // output date format
      if( !isNaN(num_date) ) {
        //console.log( "number" );
        var num2date = new Date(num_date);
        var date_utc = num2date.toUTCString();

        var output = {
          'unix': num_date,
          'utc': date_utc
        };
        console.log(output);
        res.send(output);
      
      // output date format
      } else if( !isNaN(unix_time) ) { 
        // console.log( "text" );
        var unix_time = Date.parse(date);
        var date_format = new Date(unix_time);  
        var date_utc = date_format.toUTCString(); 
        
        let output = {
          'unix': unix_time,
          'utc': date_utc
        };
        console.log(output);
        res.send(output);

      // Bad input 
      } else {
        var output = { error : "Invalid Date" };
        console.log(output);
        res.send(output);
      }
  }
);

// Empty input | current date
app.get( "/api/", 
  function( req, res ) {
    // get current time
    var unix_time = Date.now();
    var num2date = new Date(unix_time);
    var date_utc = num2date.toUTCString();
    
    var output = {
      'unix': unix_time,
      'utc': date_utc
    };
    res.send(output);
  }
);

//---------------- boilerplate ----------------

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
