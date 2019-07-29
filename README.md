# Dialogflow Implementation by Manik

We have implemented all the functionalities of Dialogflow in a more usable and easily comprehensible manner. Functionalities like Creation/Deletion of Intents, Entity, EntityType, Knowledge Base and Contexts are all included with this package


# Steps to include "manikkhurana-dialog2" 

This NPM Package contains libraries pertaining to all the REST APIs required for the aforementioned functions

## Follow the steps below in order 

 - Make sure you have mysql and mysql-workbench on the PC
 - Create a Database
 - Make a new directory "myproject" and initialize the directory with NPM - 
```sh
$ mkdir myproject
$ cd myproject
$ npm init --yes
```
 - Now we have the node_modules folder in place
 - Run the following commands to create the files credentials.js and index.js in myproject/ compulsarily
```sh
$ touch index.js credentials.js
```
- open index.js and paste the following code into it - 
```sh
const express = require('express');  
const router = express.Router();  
const app = express();  
const bodyParser = require('body-parser');  
const cors = require('cors');
const  sql_dbname  =  "db-name";
const  sql_uname  =  "your-sql username";
const  sql_password  =  "your-password";
const  sequelize  =  require('./sequelize.js');
sequelize.sqlfunc(sql_dbname ,sql_uname ,sql_password);
//import package "manikkhurana-dialog2" here
router.use(bodyParser());  
var corsOptionsDelegate = function (req, callback) {  
  var corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response  
  callback(null, corsOptions); // callback expects two parameters: error and options  
};  
router.options("*" cors(corsOptionsDelegate))
//write router.post and router.get queries as needed here
router.use(function(req,res,next)  
{  
  res.header("Access-Control-Allow-Origin","*");  
  res.header("Access-Control-Allow-Headers", "Origin,X-requested-With,Content-Type,Authorization,Accept");  
});  
const port = 3000  
app.use(router)  
app.listen(port, () => {  
  console.log(`Running on http://localhost:${port}`)  
});
```
- Now you have to require the json file that has all the credentials stored in it. (the one you downloaded when you make a project on Google Cloud Platform after agent creation in Google Dialogflow)
- Open credentials.js file and paste the following code into it -
```sh
const jsonData = require('./Your_Credentials_file.json')  
const private_key = jsonData.private_key  
const projectId = jsonData.project_id  
const client_email = jsonData.client_email  
var config = { credentials: {private_key: private_key, client_email: client_email}}  
module.exports = { config:config,projectId:projectId}
```
- Now inside index.js you may import the package as per your need. 
 For eg, if you need to use the Detect Intent feature, you will write-
```sh
const detectintent = require('manikkhurana-dialog2/routes/detectintent');
```
- To use it, we make a POST call and call this imported function as -
```sh
router.post('/detectintent',cors(corsOptionsDelegate), detectintent.detecttheIntent);
```
- Inside the scripts tag in package.json, add "start":"node index.js"
- Type npm start and BAM! your server is ON
