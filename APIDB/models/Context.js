module.exports = (sequelize, type) => {
    return sequelize.define('Context', {
        contextId: {
          type: type.INTEGER,
          primaryKey: true,
          unique:true

        },

        sessionId: {
            type: type.UUID,
            unique:true,
            primaryKey:false
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
        displayName:{
          type : type.STRING
        },
        
        lifespanCount: {
        type:type.INTEGER
        }
    })

}

