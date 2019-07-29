module.exports = (sequelize, type) => {
    return sequelize.define('EntityType', {
        entityTypeId: {
          type: type.UUID,
          primaryKey: true,
          unique:true

        },
        projectId: {
            type: type.STRING,
            autoIncrement: false,
            primaryKey:false,
            unique: false,
            foreignKey: true,
            references:{
              model:'Agents',
              Key:'projectId'
            }
          
          },
        entityTypeName:{
          type : type.STRING
        },
        Kind:{
            type : type.STRING
          },
        })

    }