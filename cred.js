const {Agent} = require('./APIDB/sequelize')
function credfunc(req, res, next) {

    Agent.findAll({
      where: {
        agentName: req.body.agentName
      },
      raw: true
    }).then(async function (results,err) {
      req.credentials= {
        project_id: results[0].projectId,
        config : {
          credentials: {
            private_key: results[0].private_key,
            client_email: results[0].client_email
          }
        }
      }
      if(err)
      {
        res.status(400).send('\n Please check your projectId');
      }
      else{
      next()
      } 
    });
  }

  module.exports = {
      credfunc: credfunc
  }
