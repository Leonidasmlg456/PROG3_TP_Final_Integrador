const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite', 
            storage: './database.sqlite', 
        });
    }

    connect() {
        return this.sequelize.authenticate()
            .then(() => {
                console.log('Conexión exitosa a la base de datos');
            })
            .catch(err => {
                console.error('No se pudo conectar a la base de datos:', err);
            });
    }
}

const database = new Database();
module.exports = database;