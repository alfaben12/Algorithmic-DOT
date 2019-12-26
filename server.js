const express = require('express')
const cors = require('cors');
const app = express()
const yaml = require('js-yaml');
const fs   = require('fs');
const dotenv = require('dotenv');
dotenv.config();

// allow request
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});


app.use(express.json());
app.use(express.urlencoded({ extended: true,limit:'100mb',parameterLimit:1000000 }));
app.use(express.static('./'));

app.get('/', function(req, res){
    console.log(process.env.SQL_CLIENT)
    console.log(process.env.SQL_HOST)
    console.log(process.env.SQL_PORT)
    console.log(process.env.SQL_USER)
    console.log(process.env.SQL_PASSWORD)
    console.log(process.env.SQL_DATABASE)
    try {
        var doc = yaml.safeLoad(fs.readFileSync('./service.yml', 'utf8'));
        return res.json(doc)
      } catch (e) {
        console.log(e);
      }
})

app.listen(3009, () => {
    console.log(`Server listening on port 3009`);
});