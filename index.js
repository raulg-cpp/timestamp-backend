// index.js
// where your node app starts

//---------------- boilerplate ----------------

// init project
var express = require('express');
var app = express();

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


//---------------- custom code ----------------

app.get( "/api/:date?", // parameters embedded in :path
  function( req, res ) {
    // selection parameters
    var input = req.params.date;
    console.log(input);

    const regNum = new RegExp('^[0-9]+$');

    const isNum = regNum.test(input);
    const isDate = !isNum && !isNaN(new Date(input));
    const isUndef = typeof(input) === 'undefined';

    let utc = '';
    let unix = '';

    // bad output
    if( !(isNum || isDate || isUndef) ) {
      console.log("error");
      res.json( { error : "Invalid Date" } );
    
    // date output
    } else {
      if( isNum ) {
        console.log("number");
        unix = Number(input);
      }
      if( isDate ) {
        console.log("date");
        unix = Date.parse(input);     
      }
      if( isUndef ) {
        console.log("no-input");
        unix = Date.now();
      }
      
      utc = new Date(unix);
      utc = utc.toUTCString();
      res.json( {'unix': unix, 'utc': utc} );
    }
  }
);
