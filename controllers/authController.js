const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class AuthController {
    async registro(req, res) {
        const { nombre, apellido, correo, contraseña, tipoUsuario } = req.body;
        try {
            let usuario = await Usuario.findOne({ where: { correo } });
            if (usuario) return res.status(400).json({ msg: 'Usuario ya existe' });

            const hashedPassword = bcrypt.hashSync(contraseña, 10);

            usuario = await Usuario.create({
                nombre,
                apellido,
                correo,
                contraseña: hashedPassword,
                tipoUsuario,
            });

            const token = jwt.sign({ id: usuario.id, tipoUsuario: usuario.tipoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    }

    async login(req, res) {
        const { correo, contraseña } = req.body;
        try {
            const usuario = await Usuario.findOne({ where: { correo } });
            if (!usuario) return res.status(400).json({ msg: 'Credenciales incorrectas' });

            const esCoincidente = bcrypt.compareSync(contraseña, usuario.contraseña);
            if (!esCoincidente) return res.status(400).json({ msg: 'Credenciales incorrectas' });

            const token = jwt.sign({ id: usuario.id, tipoUsuario: usuario.tipoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    }
}

module.exports = new AuthController();