# Dialogflow Implementation by Manik

We have implemented all the functionalities of Dialogflow in a more usable and easily comprehensible manner. Functionalities like Creation/Deletion of Intents, Entity, EntityType, Knowledge Base and Contexts are all included with this package. 

##### Compatibility 
This Package is compatible with other frameworks and other Database Providers. Currently, we have added support for Express JS Framework (in the code given below) and MYSQL Database (in our package) 


## Steps to include "manikkhurana-dialog2" 

This NPM Package contains libraries pertaining to all the REST APIs required for the aforementioned functions

### Follow these steps below in order 

 - Make sure you have mysql and mysql-workbench installed on the PC
 - Create a Database in MySQL via terminal or mysql-workbench as applicable
 - Make a new directory **myproject** and initialize the directory with NPM - 
```sh
$ mkdir myproject
$ cd myproject
$ npm init --yes
```
 - Now we have the node_modules folder in place
 - Run the following command to create the file **index.js** in myproject/ and then install Express JS 
```sh
$ touch index.js 
$ npm install express 
```
- open index.js and paste the following code into it - 
```sh
process.env.sqlDBname = '<Name of the DB you created>';
process.env.sqluname = '<Your SQL Username>';
process.env.sqlpassword = '<Your SQL Password>';
const code = require ('manikkhurana-dialog2/src/codefile')
const credentials = require ('manikkhurana-dialog2/cred')
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
router.use(bodyParser.json());

router.use(function(req,res,next) 
{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "token");
    next();
})
var corsOptionsDelegate = function (req, callback) {
    var corsOptions = { origin: true }; 
    callback(null, corsOptions); 
}
router.use(cors(corsOptionsDelegate))
router.options('*', cors(corsOptionsDelegate))

//Write here: POST/GET Calls

app.use(router)  
app.listen(3000, () => {  
  console.log("Running on http://localhost:3000")  
});
```
- Now you have to open the json file which has all the credentials stored. This is the file you download when you make a project on Google Cloud Platform after agent creation in Google Dialogflow
- To start using the package, we have to make POST calls as mentioned below
- Also, inside the "scripts" tag in package.json, add the "start" tag. This helps you start the server simply by  "npm start" in the terminal
```sh
"scripts": {
    ...  ,
    "start": "node index.js"
  },
```
- Type npm start and BAM! your server is ON 

- If you want to Use all the functionalities, you can directly copy all these POST Requests and paste it inside the **index.js** file
```sh
router.post('/createAgentEntry', code.createAgentEntry)
router.post('/createIntent', credentials.credfunc, code.createIntent); //Write like this one to add functionalities
router.post('/deleteIntent', credentials.credfunc,code.deleteIntent);
router.post('/detectIntent', credentials.credfunc,code.detectIntent);
router.post('/listIntent',  credentials.credfunc,code.listIntent);
router.post('/createEntityType',  credentials.credfunc,code.createEntityType);
router.post('/createEntity', credentials.credfunc, code.createEntity);
router.post('/createKB', credentials.credfunc, code.createKnowledgeBase);
router.post('/deleteKB', credentials.credfunc, code.deleteKnowledgeBase);
router.post('/getKB', credentials.credfunc, code.getKnowledgeBase);
```

## Here's how you call the APIs -
For all ----> Type = JSON (Application/JSON)

##### Agent Creation Request
 Creation of Agent- First Call:
   This has to be called before anything else and these values are to be copied straight from the JSON File you downloaded and pasted into the request body of the call
  (POST) http://localhost:3000/createAgentEntry
   request-body = 
```sh
    { 
	"projectId":"<Your Project ID>",
	"displayName":"<Agent's name>",
	"private_key":"<Private Key>",
	"client_email":"<Client Email>"
	}
```
##### Create Intent: 
   (POST) http://localhost:3000/createIntent
   request-body = 
```sh
    {   "agentName":"<Agent-Name>",
        "displayName":"<Intent-Name>"   }
```
##### Delete Intent: 
   (POST) http://localhost:3000/deleteIntent
   request-body = 
```sh
   {   "agentName":"<Agent-Name>",
       "displayName":"<Intent-Name>"   }
```
##### Detect Intent: 
  (POST) http://localhost:3000/detectIntent 
   request-body = 
```sh
    {   "agentName":"<Agent-Name>",
	    "query":"<User-Input"     }
```
##### List Intent: 
   (POST)  http://localhost:3000/listIntent
   request-body = 
```sh
    {   "agentName":"<Agent-Name>"   }
```

##### Create Entity Type: 
   (POST) http://localhost:3000/createEntityType
   request-body = 
```sh
    {
	"agentName":"<Agent-Name>",
	"entityTypeName":"<Entity-Type Name>",
	"kind":"<Kind Type>"
    }
```
Example of request-body = 
```sh
    {
	"agentName":"Agent1",
	"entityTypeName":"EntityType1",
	"kind":"KIND_MAP"
    }
```
##### Create Entity
   (POST) http://localhost:3000/createEntity
   request-body = 
```sh
    {
    "agentName":"<Agent-Name>",
    "entityTypeName": "<Entity-Type-Name>",
    "entityValue": "<Entity-Name>",
    "synonyms": ["<synonym>", "<synonym>",...]
    }
```
Example of request-body = 
```sh
    {
    "agentName":"Agent1",
    "entityTypeName": "EntityType1",
    "entityValue": "Entity1",
    "synonyms": ["abc", "xyz"]
    }
```
##### Create Knowledge Base 
   (POST) http://localhost:3000/createKB
request-body = 
```sh
    {   "agentName":"<Agent-Name>",
        "knowledgeBaseName":"<Knowledge-Base-Name>"
    }
```
Example of request-body = 
```sh
    {
       "agentName":"Agent1",
       "knowledgeBaseName": "Knowledge Base-8"
    }
```
##### Delete Knowledge Base 
   (POST) http://localhost:3000/deleteKB
request-body = 
```sh
    {   "agentName":"<Agent-Name>",
        "knowledgeBaseName":"<Knowledge-Base-Name>"
    }
```
Example of request-body = 
```sh
    {
	  "agentName":"Agent1",
      "knowledgeBaseName": "<Knowledge-Base-Name>" 
    }
```
##### Get Knowledge Bases 
   (POST) http://localhost:3000/deleteKB
request-body = 
```sh
    {   "agentName":"<Agent-Name>",
        "knowledgeBaseName":"<Knowledge-Base-Name>"
    }
```
Example of request-body = 
```sh
    {
	  "agentName":"Agent1",
      "knowledgeBaseName": "<Knowledge-Base-Name>"
    }
```

### Common Errors and how to resolve them 
- (node:27919) UnhandledPromiseRejectionWarning: FetchError: request to https://www.googleapis.com/oauth2/v4/token failed, reason: getaddrinfo EAI_AGAIN www.googleapis.com
 **Reason - You are not connected to the Internet**
- Unhandled rejection TypeError: Cannot read property 'intentId' of undefined
 **Reason - The name value that you provided in the request doesnot exist in the DB for that particular Agent-Name**
 
### Common Understood facts - 
- There is no error in the NPM Package. Needn't change anything there. 
- You cannot delete what you haven't created
- For creating any Entity you must create an EntityType before
- The /createAgentEntry must be your first call when you create the project. This will store your Credentials in the DB. After this step, you can call APIs anytime by specifying the Agent-Name
