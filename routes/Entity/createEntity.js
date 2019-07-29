
const express = require('express')
const router  = express.Router()
const cors = require('cors')
const credentials = require ('../../Cred');
const {Entity} = require('../../APIDB/sequelize');
const {EntityType} = require('../../APIDB/sequelize');
//runSample is the function to detect intent
async function runSample(req,res) {
  
const dialogflow = require('dialogflow');
const uuid = require('uuid');
EntityType.findAll ({
  where : {
    
    entityTypeName : req.body.entityTypeName
  },
  raw:true

}).then(async function(results) {
  console.log(results)
entityTypeId = results[0].entityTypeId;
entityValue = req.body.entityValue;
synonyms = req.body.synonyms;
 

// A unique identifier for the given session
const sessionId = uuid.v4();

//include the above in all apis

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient(credentials.config);

  // The path to the agent the created entity belongs to.
  const agentPath = entityTypesClient.entityTypePath(credentials.project_id, entityTypeId);

  const entity = {
    value: entityValue,
    synonyms: synonyms,
  };

  const createEntitiesRequest = {
    parent: agentPath,
    entities: [entity],
  };

  const [response] = await entityTypesClient.batchCreateEntities(
    createEntitiesRequest
  );// Create a new session
  console.log('Created entity type:');
  console.log(response);
 
    const responses = response[0].name;
    const separate = responses.split ('/');
    const newObject = {'EntityId': separate[4],"projectId":seperate[1],"entityTypeName":responses[0].displayName,"kind":responses[0].kind};
    Entity.create(newObject);
  })
}  

module.exports = {
    runSample: runSample
    };
    