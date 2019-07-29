module.exports = (sequelize, type) => {
    return sequelize.define('Intent', {
        intentId: {
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
        displayName:{
          type : type.STRING
        },
        
        // TrainingPharsesParts: {
        //   type : type.ARRAY(type.STRING)
        // },

        // MessageTexts:{
        //     type : type.STRING
        //   }
    })

}