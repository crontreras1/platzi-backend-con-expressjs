const { listReservationService } = require("../services/adminService")

exports.createReservation = async (req, res) => {
  try {
    const reservataion = await listReservationService.createReservation(req.body);
    res.status(201).json(reservataion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

exports.getReservation = async (req, res) => {
  try {
    const reservataion = await listReservationService.getReservation(req.params.id);
    if (!reservataion) {
      res.status(404).json({ error: 'Reservación no encontrada' });
    };

    res.status(201).json(reservataion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

