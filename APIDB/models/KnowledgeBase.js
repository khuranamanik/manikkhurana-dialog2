module.exports = (sequelize, type) => {
    return sequelize.define('KnowledgeBase', {
        knowledgeBaseId: {
          type: type.UUID,
          primaryKey: true,
          unique:true
        },
        projectId: {
          type: type.STRING,
          primaryKey: false,
          autoIncrement: false,
          unique: false,
          foreignKey: true,
          references:{
            model:'Agents',
            Key:'projectId'
          },
        
        },
        knowledgeBaseName:{
          type : type.STRING
        },

        knowledgeBaseValue: {
          type : type.STRING,
        },
        
        
    })

}

