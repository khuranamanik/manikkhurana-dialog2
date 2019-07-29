const express = require('express')
const router  = express.Router()
//const cors = require('cors')
const credentials = require ('../../Cred');
const {KnowledgeBase} = require('../../APIDB/sequelize');
//DELETES ONLY THOSE KNOWLEDGE BASES THAT DO NOT HAVE A DOCUMENT
//SHOWS ERROR: THE KNOWLEDGE BASE HAS A DOCUMENT IN IT. IF YOU STILL WANT TO, AND THE TERMINATES
async function deleteKnowledgeBase(req,res)
    
    
     {
    // [START dialogflow_delete_knowledge_base]
    // Instantiate a DialogFlow client.
    const dialogflow = require('dialogflow').v2beta1;
    KnowledgeBase.findAll ({
      where : {
        
        displayName : req.body.displayName
      },
      raw:true

    }).then(async function(results) {

    knowledgeBaseFullName = results[0].knowledgeBaseFullName;
 
    // Instantiate a DialogFlow KnowledgeBasesClient.
    const client = new dialogflow.KnowledgeBasesClient(credentials.config,credentials.project_id);
    //const knowledgeBaseFullName = 'projects/chatbot-perennial-243513/knowledgeBases/MzQwNjE4NTg2Nzc4MDI5MjYwOA';

    const [result] = await client.deleteKnowledgeBase({
      name: knowledgeBaseFullName,
    });
    
    
    console.log('knowledge Base Deleted');
    res.send('knowledge Base Deleted');
    KnowledgeBase.destroy({
      where: {
          knowledgeBaseFullName : knowledgeBaseFullName
      }
    })

})
     }
  module.exports = {
    deleteKnowledgeBase: deleteKnowledgeBase
}