const { DataTypes, Model } = require('sequelize');
const database = require('../config/db');

class Usuario extends Model {}

Usuario.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipoUsuario: {
        type: DataTypes.ENUM('cliente', 'empleado', 'administrador'),
        allowNull: false,
    },
    imagen: DataTypes.STRING,
}, {
    sequelize: database.sequelize,
    modelName: 'Usuario',
});

module.exports = Usuario;