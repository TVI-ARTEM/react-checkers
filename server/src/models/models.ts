const sequelize = require('../db')
const {DataTypes} = require('sequelize')

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

export const GameWinner = sequelize.define('winner', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


User.hasMany(GameWinner)
GameWinner.belongsTo(User)

module.exports = {
    User,
    GameWinner,
}