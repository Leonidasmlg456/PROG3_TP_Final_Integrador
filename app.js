const express = require('express');
const database = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

database.connect();

database.sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
});

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});