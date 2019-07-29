
const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow').v2beta1;
const {Agent} = require('../../APIDB/sequelize');
const googleapi = require('googleapis');
const credentials = require('../../Cred');
async function runSample(req,res) {
  Agent.findAll ({
    where : {
      
      projectId : credentials.project_id
    },
    raw:true

  }).then(async function(results) {
const agentClient = new dialogflow.AgentsClient(credentials.config);
const projectPath = agentClient.projectPath(credentials.project_id);
const agent = {   
    displayName: results[0].displayName,
    languageCode : 'en-US',   
};
const trainAgentRequest = {
    parent: projectPath,
    agent : agent
    };
    
const responses = await agentClient.trainAgent(trainAgentRequest);
console.log(responses);

const responsetouser = responses;
  let respData = {
    data: responsetouser
  };
  res.send(respData);
})
}
module.exports = {
 runSample : runSample 
 }
