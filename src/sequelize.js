import Sequelize from 'sequelize';
import usersModel from './app/models/users.model';
import xlsxImports from './app/models/xlsxImports.model'

global.sequelize = new Sequelize('databaseName', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const Users = usersModel(sequelize, Sequelize);
const XlsxImports = xlsxImports(sequelize, Sequelize);

// sequelize.sync({
//         force: true
//     })
//     .then(() => {
//         console.log(`Database & tables created!`)
//     })

module.exports = {
    Users,
    XlsxImports
}