const express = require('express')
const router  = express.Router()
const util = require('util');
const fs = require('fs');
const {struct} = require('pb-util');
const pump = require('pump');
const through2 = require('through2');
const uuid = require('uuid');

projectId = 'flights-bjrxvg'
function detectTextIntent(req, res) {

  // [START dialogflow_detect_intent_text]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');
  let text = req.body.text; 
  query = text;
  queries = query;

  const sessionId = uuid.v4();
  // Instantiates a session client
  const sessionClient = new dialogflow.SessionsClient();

  if (!queries || !queries.length) {
    return;
  }

  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  // const logQueryResult = logQueryResult();
  let promise;

  // Detects the intent of the queries.
  for (const query of queries) {
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
            text: query,
          languageCode: 'en-US',
        },
      },
    };

    if (!promise) {
      // First query.
      console.log(`Sending query "${query}"`);
      promise = sessionClient.detectIntent(request);
    } else {
      promise = promise.then(responses => {
        console.log('Detected intent');
        const response = responses[0];
        logQueryResult(sessionClient, response.queryResult);

      
        // Use output contexts as input contexts for the next query.
        response.queryResult.outputContexts.forEach(context => {
          // There is a bug in gRPC that the returned google.protobuf.Struct
          // value contains fields with value of null, which causes error
          // when encoding it back. Converting to JSON and back to proto
          // removes those values.
          context.parameters = struct.encode(struct.decode(context.parameters));
        });
        request.queryParams = {
          contexts: response.queryResult.outputContexts,
        };

        console.log(`Sending query "${query}"`);
        return sessionClient.detectIntent(request);
      });
    }
  }

  promise
    .then(responses => {
      console.log('Detected intent');
      logQueryResult(sessionClient, responses[0].queryResult);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  }
  
  module.exports = {
  detectTextIntent : detectTextIntent
  }