module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admins', {
        email: {
            type: DataTypes.STRING(255),
            field: 'email',
            allowNull: false,
            unique: true            
        },
        password: {
            type: DataTypes.STRING(255),
            field: 'password',
            allowNull: false          
        },
        roletype: {
            type: DataTypes.STRING(255),
            field: 'roletype',
            allowNull: false
        },
    
    })
}