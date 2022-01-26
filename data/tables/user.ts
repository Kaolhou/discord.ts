import {DataTypes} from 'sequelize'
/*import Database from '../../classes/database'
const database = new Database()*/
import { Sequelize } from 'sequelize'
//import user from '../../interfaces/user'
//Database.db.sequelize
//console.log(database)
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
    }
})

//Users.sync({force: true})

export default Users