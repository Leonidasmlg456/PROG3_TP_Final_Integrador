const { DataTypes, Model } = require('sequelize');
const database = require('../config/db');

class Reclamo extends Model {}

Reclamo.init({
    asunto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    fechaFinalizacion: DataTypes.DATE,
    estado: {
        type: DataTypes.ENUM('creado', 'en proceso', 'finalizado', 'cancelado'),
        defaultValue: 'creado',
    },
    tipoReclamo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database.sequelize,
    modelName: 'Reclamo',
});

module.exports = Reclamo;