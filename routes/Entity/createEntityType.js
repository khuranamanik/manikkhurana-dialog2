const express = require('express');
const router = express.Router();
const credentials = require ('../../Cred');
const {EntityType} = require('../../APIDB/sequelize');

async function runSample(req,res) {
    // [START dialogflow_create_entity_type]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');
    // Instantiates clients
    const entityTypesClient = new dialogflow.EntityTypesClient(credentials.config);
    displayName = req.body.displayName;
    kind = req.body.kind;
    // The path to the agent the created entity type belongs to.
    const agentPath = entityTypesClient.projectAgentPath(credentials.project_id);
  
    const createEntityTypeRequest = {
      parent: agentPath,
      entityType: {
        displayName: displayName,
        kind: kind,
      },
    };
  
    const responses = await entityTypesClient.createEntityType(createEntityTypeRequest);
    console.log(`Created ${responses[0].name} entity type`);
    console.log(responses);
    const response = responses[0].name;
    const separate = response.split ('/');
    const newObject = {'entityTypeId': separate[4],"projectId":separate[1],"entityTypeName":req.body.displayName,"kind":req.body.kind};
    // [END dialogflow_create_entity_type]
    EntityType.create(newObject)
        .then(response => "")
    const responsetouser = responses[0].name;
  let respData = {
    data: responsetouser
  };
  res.send(respData);
}

 module.exports = {
 runSample : runSample 
 } 
