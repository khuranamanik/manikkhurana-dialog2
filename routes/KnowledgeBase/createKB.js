const express = require('express')
const router  = express.Router()
const sessionId = require('uuid/v1')();
const util = require('util');
const credentials = require ('../../Cred');
const {KnowledgeBase} = require('../../APIDB/sequelize');
async function createKnowledgeBase(req,res) {
  const dialogflow = require('dialogflow').v2beta1;
  const client = new dialogflow.KnowledgeBasesClient(credentials.config);
   displayName = req.body.displayName;
  const formattedParent = client.projectPath(credentials.project_id);
  const knowledgeBase = {
    displayName: displayName,
  };
  const request = {
    parent: formattedParent,
    knowledgeBase: knowledgeBase,
  };
  const [result] = await client.createKnowledgeBase(request);
  console.log('KnowledgeBase Created');
  console.log(`Name: ${result.name}`);
  console.log(`displayName: ${result.displayName}`);
  console.log(result);

  const response = result.name;
  const seperate = response.split ('/');
  const newOject={"knowledgeBaseId": seperate[3],"projectId":seperate[1],"displayName":req.body.displayName,"knowledgeBaseFullName":result.name};
  console.log(newOject);
    KnowledgeBase.create(newOject)
        .then(response => "")

  const responsetouser = result;
  let respData = {
    data: responsetouser
  };
  res.send(respData);
  
}
module.exports = {
    createKnowledgeBase: createKnowledgeBase
};