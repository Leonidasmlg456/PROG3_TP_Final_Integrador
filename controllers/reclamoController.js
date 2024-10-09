const Reclamo = require('../models/Reclamo');

exports.crearReclamo = async (req, res) => {
    const { asunto, descripcion, tipoReclamo } = req.body;
    try {
        const nuevoReclamo = new Reclamo({
            asunto,
            descripcion,
            tipoReclamo,
            cliente: req.usuario.id,
        });
        await nuevoReclamo.save();
        res.json(nuevoReclamo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

exports.obtenerReclamosCliente = async (req, res) => {
    try {
        const reclamos = await Reclamo.find({ cliente: req.usuario.id });
        res.json(reclamos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};