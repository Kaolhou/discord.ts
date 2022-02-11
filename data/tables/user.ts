import {DataTypes} from 'sequelize'
import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('test-db','user', 'pass',{
    host: '../discord.ts2/data/storage/dev.sqlite',
    dialect: 'sqlite'
})

const Users = sequelize.define('Users',{
    user:{
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
        autoIncrement:false,
    },
    count: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
    },
    author:{
        type: DataTypes.STRING,
        allowNull:false,
    }
})

//Users.sync({force: true})

export default Users