module.exports = (sequelize, type) => {
    return sequelize.define('Document', {
        documentId: {
          type: type.UUID,
          primaryKey: true,
          unique:true
        },
        knowledgeBaseId: {
          type: type.UUID,
          primaryKey: false,
          autoIncrement: false,
          unique: false,
          foreignKey: true,
          references:{
          model:'KnowledgeBases',
          Key:'knowledgeBaseId'
          }
        },

        
        displayName:{
          type : type.STRING
        },
        
        documnetName: {
          type : type.STRING
        },
        documnetPath: {
            type : type.STRING
        },
        knowledgeTypes: {
            type : type.STRING
        },
        mimeType: {
            type : type.STRING
        },
      })

}