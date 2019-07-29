
const credentials = require ('../../Cred');
const express = require('express');
const router = express.Router();  
const bodyParser = require('body-parser')
const {Intent} = require('../../APIDB/sequelize');
const jwt_Decode = require('jwt-decode');

async function createIntent(req,res)
{
  // [START dialogflow_create_intent]
  // Imports the Dialogflow library
  // var ca = req.token;
  // var base64Url = ca.split('.')[1];
  // var decodedValue = JSON.parse(window.atob(base64Url));
  // console.log(decodedValue);
  // console.log("My token is",req.token);

  const token = req.token;
  const decoded = jwt_Decode(token);
  
  //const projectId = decoded.split (',');
  const projectId = decoded.project_id;
  console.log("decoded is",decoded);
  console.log("My project Id is",projectId);
  console.log("Direct is",decoded.project_id);

  const dialogflow = require('dialogflow');
  text = req.body.displayName;
  let displayName;
  // Instantiates the Intent Client
  const intentsClient = new dialogflow.IntentsClient(credentials.config);

  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.projectAgentPath(credentials.project_id);

  const intent = {
    displayName:`${text}`
  };

  const createIntentRequest = {
    parent: agentPath,
    intent: intent
  };

  // Create the intent
  const responses = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${responses[0].name} created`);
  
  const response = responses[0].name;
  const seperate = response.split ('/');
  const newOject={"intentId": seperate[4],"projectId":seperate[1],"displayName":req.body.displayName};
  console.log(newOject);
    Intent.create(newOject)
        .then(response => "")

const responsetouser = responses[0].name;
let respData = {
    data: responsetouser
  };
  res.send(respData);
}
   
module.exports={
  createIntent : createIntent
}
