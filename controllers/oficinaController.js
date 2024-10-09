const Oficina = require('../models/Oficina');

exports.crearOficina = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevaOficina = new Oficina({ nombre });
        await nuevaOficina.save();
        res.json(nuevaOficina);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

exports.obtenerOficinas = async (req, res) => {
    try {
        const oficinas = await Oficina.find();
        res.json(oficinas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};