const express = require('express');
const credentials = require ('../../Cred');
const router  = express.Router();
async function listIntents(req,res) {
    // [START dialogflow_list_intents]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');
    // Instantiates clients
    const intentsClient = new dialogflow.IntentsClient(credentials.config);
  
    // The path to identify the agent that owns the intents.
    const projectAgentPath = intentsClient.projectAgentPath(credentials.project_id);
      const request = {
      parent: projectAgentPath,
    	};
  
    console.log(projectAgentPath);
  
    // Send the request for listing intents.
    const [response] = await intentsClient.listIntents(request);
    response.forEach(intent => {
      console.log('====================');
      console.log(`Intent name: ${intent.name}`);
      console.log(`Intent display name: ${intent.displayName}`);
      console.log(`Action: ${intent.action}`);
      console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
      console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);
  
      console.log('Input contexts:');
      intent.inputContextNames.forEach(inputContextName => {
        console.log(`\tName: ${inputContextName}`);
      });
      
      console.log('Output contexts:');
      intent.outputContexts.forEach(outputContext => {
        console.log(`\tName: ${outputContext.name}`);
      });
    });
    // [END dialogflow_list_intents]
    const responsetouser = response;
    //  return responsetouser;
    let respData = {
    data: responsetouser
    };
    res.send(respData);
    }
    //console.log(responsetouser);
  module.exports = {
      listIntents : listIntents
  };
