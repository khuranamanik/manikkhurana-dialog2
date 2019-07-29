module.exports = (sequelize, type) => {
    return sequelize.define('Entity', {
        entityId: {
          type: type.UUID,
          primaryKey: true,
          unique:true

        },
        // EntityTypeId:{
        //     type : type.INTEGER
        //   },

        entityValue:{
            type : type.STRING //ARRAY?
        },

        // Synonyms: {
        //     type : type.ARRAY(type.STRING)
        //   },
        entityTypeId: {
          type: type.UUID,
          primaryKey: false,
          autoIncrement: false,
          unique: false,
          foreignKey: true,
          references:{
            model:'EntityTypes',
            Key:'entityTypeId'
          },
        
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
        // displayName:{
        //   type : type.STRING
        // },
        
        // Kind:{
        //     type : type.STRING
        //   },

          // SessionId: {
          //   type: type.UUID,
          //   unique:true
  
          // },

        // EntityTypeDisplayName:{
        //     type : type.STRING
        // },
        
        // EntityOverrideMode:{
        //     type : type.BOOLEAN
        // },
    })

}