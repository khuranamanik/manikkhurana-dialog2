const jsonData = require('./botfile.json')
const project_id = jsonData.project_id
const private_key = jsonData.private_key
const client_email = jsonData.client_email
var config = {
    credentials: {
            private_key: private_key,
            client_email: client_email
    }};

module.exports = {
    config: config, project_id: project_id
}
