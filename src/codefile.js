
const {Agent,Intent,Entity,EntityType,KnowledgeBase} = require('../APIDB/sequelize');
const uuid = require('uuid');
const dialogflow = require('dialogflow');

async function createAgentEntry(req,res) { 
  Agent.create(req.body)
    .then(result => {
      console.log("Agent Entry created. Check Database.")
      res.json(result)
    });
}

async function listIntent(req,res) { 
const intentsClient = new dialogflow.IntentsClient(req.credentials.config);
const projectAgentPath = intentsClient.projectAgentPath(req.credentials.project_id);
const request = {
parent: projectAgentPath,
};
const [response] = await intentsClient.listIntents(request);
var array = [];
i=0;
response.forEach(intent => {
console.log('====================');
console.log(`Intent Full name: ${intent.name}`);
console.log(`Intent Display name: ${intent.displayName}`);
array.push(intent.displayName)
i++;
respData = {
  Intents: array
  };
});
res.send(respData);
}


async function detectIntent (req,res) {
const sessionId = uuid.v4();
const sessionClient = new dialogflow.SessionsClient(req.credentials.config);
const sessionPath = sessionClient.sessionPath(req.credentials.project_id, sessionId);
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: req.body.query,
      languageCode: 'en-US',
    },
  },
};
const responses = await sessionClient.detectIntent(request);
console.log('Detected intent');
const result = responses[0].queryResult;
console.log(`  Query: ${result.queryText}`);
console.log(`  Response: ${result.fulfillmentText}`);
if (result.intent) {
  console.log(`  Intent: ${result.intent.displayName}`);
} else {
  console.log(`  No intent matched.`);
}
const responsetouser = result.fulfillmentText;
res.send(responsetouser)
}

async function deleteIntent(req, res) {
  Intent.findAll({
    where: {
      intentName: req.body.intentName
    },
    //raw: true
  }).then(async function (results) {
    IntentId = results[0].intentId;
    const intentsClient = new dialogflow.IntentsClient(req.credentials.config);
    const intentPath = intentsClient.intentPath(req.credentials.project_id, IntentId);
    const request = { name: intentPath };
    const result = await intentsClient.deleteIntent(request);
    console.log(`Intent \"${req.body.intentName}\" deleted`);
    Intent.destroy({
      where: {
        intentId: IntentId
      }
    })
  })
  res.send(`Intent ${req.body.intentName} deletion successful`);
} 


async function createIntent(req,res)
{
  // Instantiates the Intent Client
  const intentsClient = new dialogflow.IntentsClient(req.credentials.config);
  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.projectAgentPath(req.credentials.project_id);
  const intent = {
    displayName:req.body.intentName
  };
  const createIntentRequest = {
    parent: agentPath,
    intent: intent
  };
  // Create the intent
  const responses = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${req.body.intentName} creation successful`);
  const response = responses[0].name;
  const seperate = response.split ('/');
  const newObject={"intentId": seperate[4],"projectId":seperate[1],"intentName":req.body.intentName};
    Intent.create(newObject)
        .then(response => "") 
  res.send(`Intent ${req.body.intentName} creation successful`);
 
}  
  
async function createEntity(req,res) {
EntityType.findAll ({
  where : {
    entityTypeName : req.body.entityTypeName
  },
  raw:true
}).then(async function(results) {
  //console.log("\n\n",results,"\n\n")
entityTypeId = results[0].entityTypeId
entityValue = req.body.entityValue;
synonyms = req.body.synonyms;
const entityTypesClient = new dialogflow.EntityTypesClient(req.credentials.config);
const agentPath = entityTypesClient.entityTypePath(req.credentials.project_id, entityTypeId);
const entity = {
 value: entityValue,
 synonyms: synonyms,
};
const createEntitiesRequest = {
 parent: agentPath,
 entities: [entity],
};
const [response] = await entityTypesClient.batchCreateEntities(createEntitiesRequest);
// Create a new session
console.log('Created entity Name: ', entityValue);
const x = JSON.parse(JSON.stringify(response));
const responses = x.name;
const seperate = responses.split ('/');
res.send(`Created Entity Name : ${entityValue}`);
const newObject= {"entityId": seperate[3],"entityValue":entityValue,"projectId":seperate[1],"entityTypeId":results[0].entityTypeId,"entityTypeName":responses[0].displayName,"Kind":responses[0].kind};
Entity.create(newObject);
})
//res.send('Created entity Name: ', entityValue);
}  

async function createEntityType(req,res) {
    const entityTypesClient = new dialogflow.EntityTypesClient(req.credentials.config);
    //displayName = req.body.entityTypeName;
    kind = req.body.kind;
    // The path to the agent the created entity type belongs to.
    const agentPath = entityTypesClient.projectAgentPath(req.credentials.project_id);
  
    const createEntityTypeRequest = {
      parent: agentPath,
      entityType: {
        displayName: req.body.entityTypeName,
        kind: kind,
      },
    };
    const responses = await entityTypesClient.createEntityType(createEntityTypeRequest);
    console.log(`Created ${req.body.entityTypeName} entity type`);
    const response = responses[0].name;
    const separate = response.split ('/');
    const newObject = {'entityTypeId': separate[4],"projectId":separate[1],"entityTypeName":req.body.entityTypeName,"kind":req.body.kind};
    EntityType.create(newObject)
        .then(response => "")
    const responsetouser = responses[0].name;
  let respData = {
    data: responsetouser
  };
  res.send(`Created ${req.body.entityTypeName} entity type`);
}

async function createKnowledgeBase(req,res) {
  const client = new dialogflow.v2beta1.KnowledgeBasesClient(req.credentials.config);
  knowledgeBaseName = req.body.knowledgeBaseName;
  const formattedParent = client.projectPath(req.credentials.project_id);
  const knowledgeBase = {
    displayName: knowledgeBaseName,
  };
  const request = {
    parent: formattedParent,
    knowledgeBase: knowledgeBase,
  };
  const [result] = await client.createKnowledgeBase(request);
  console.log(`Knowledge Base Created! Knowledge Base Name: ${result.displayName}`);
  const response = result.name;
  const seperate = response.split ('/');
  const newObject={"knowledgeBaseId": seperate[3],"projectId":seperate[1],"knowledgeBaseName":knowledgeBaseName,"knowledgeBaseValue":result.name};
    KnowledgeBase.create(newObject)
        .then(response => "")
  res.send(`Knowledge Base Name: ${result.displayName}`);
}


async function deleteKnowledgeBase(req,res)  
   {
    KnowledgeBase.findAll ({
      where : {     
        knowledgeBaseName : req.body.knowledgeBaseName
      },
    }).then(async function(results) {
      
    knowledgeBaseValue = results[0].knowledgeBaseValue;
    const client = new dialogflow.v2beta1.KnowledgeBasesClient(req.credentials.config,req.credentials.project_id);
    const [result] = await client.deleteKnowledgeBase({
      name: knowledgeBaseValue,
    });
    console.log('Knowledge Base Deleted ', req.body.knowledgeBaseName);
    res.send(`Knowledge Base Deleted: ${req.body.knowledgeBaseName}`);
    KnowledgeBase.destroy({
      where: {
          knowledgeBaseValue : knowledgeBaseValue
      }
    })
})
}

async function getKnowledgeBase(req,res) {
    const client = new dialogflow.v2beta1.KnowledgeBasesClient(req.credentials.config)
    KnowledgeBase.findAll ({
      where : {
        knowledgeBaseName : req.body.knowledgeBaseName
      },
      raw:true
    }).then(async function(results) {
    knowledgeBaseId = results[0].knowledgeBaseId; 
    const formattedName = client.knowledgeBasePath(req.credentials.project_id, knowledgeBaseId);
    const [result] = await client.getKnowledgeBase({name: formattedName});
    console.log(`Knowledge Base Name: ${result.displayName}`);
    console.log(`Value : ${result.name}`);
  
    const responsetouser = result;
    let respData = {
    data: responsetouser
  };
    res.send(respData);
  
})
}

module.exports={
  createAgentEntry : createAgentEntry,
  createIntent : createIntent,
  deleteIntent : deleteIntent,
  detectIntent : detectIntent,
  listIntent : listIntent,
  createEntityType : createEntityType,
  createEntity : createEntity,
  createKnowledgeBase : createKnowledgeBase,
  deleteKnowledgeBase : deleteKnowledgeBase,
  getKnowledgeBase: getKnowledgeBase
}
