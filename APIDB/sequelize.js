const sqlDBname = process.env.sqlDBname
const sqluname = process.env.sqluname
const sqlpassword = process.env.sqlpassword
const Sequelize = require('sequelize')
const AgentModel = require('./models/Agent')
const IntentModel = require('./models/Intent')
const EntityTypeModel = require('./models/EntityType');
const EntityModel = require('./models/Entity')
const ContextModel = require('./models/Context')
const KnowledgeBaseModel = require('./models/KnowledgeBase')
const DocumentModel = require('./models/Document')

const sequelize = new Sequelize(sqlDBname, sqluname, sqlpassword, { 
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
  Agent = AgentModel(sequelize, Sequelize)
  Intent = IntentModel(sequelize, Sequelize)
  EntityType = EntityTypeModel(sequelize, Sequelize)
  Entity = EntityModel(sequelize, Sequelize)
  Context = ContextModel(sequelize, Sequelize)
  KnowledgeBase = KnowledgeBaseModel(sequelize, Sequelize)
  Document = DocumentModel(sequelize, Sequelize)

  Agent.hasMany(Intent, {
    foreignKey: {
      name: 'projectId',
      allowNull: false
    }
  })
  Agent.hasMany(Entity, {
    foreignKey: {
      name: 'projectId',
      allowNull: false
    }
  })

  Agent.hasMany(Context, {
    foreignKey: {
      name: 'projectId',
      allowNull: false
    }
  })

  Agent.hasMany(EntityType, {
    foreignKey: {
      name: 'projectId',
      allowNull: false
    }
  })
  Agent.hasMany(Entity, {
    foreignKey: {
      name: 'projectId',
      allowNull: false
    }
  })
  EntityType.hasMany(Entity, {
    foreignKey: {
      name: 'entityTypeId',
      allowNull: false
    }
  })
  Agent.hasMany(KnowledgeBase, {
    foreignKey: {
      name: 'projectId',
      allowNull: false
    }
  })

  KnowledgeBase.hasMany(Document, {
    foreignKey: {
      name: 'knowledgeBaseId',
      allowNull: false
    }
  })

  sequelize.sync()
    .then(() => {
      console.log('\nDatabase & tables created!\n')
    })

module.exports = {
  Agent,
  Intent,
  EntityType,
  Entity,
  Context,
  KnowledgeBase,
  Document
}
