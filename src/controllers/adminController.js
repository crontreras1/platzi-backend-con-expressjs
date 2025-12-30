const { createTimeBlockService, listReservationService } = require('../services/adminService');

const createTimeBlock = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Acceso denegado'});
  };
  
  const { startTime, endTime } = req.body;
  
  try {
    const newTimeBlock = await createTimeBlockService(startTime, endTime);
    res.status(201).json(newTimeBlock);
  } catch (error) {
    res.status(500).json({ error: 'Error creando un bloque de tiempo'});
  }
};

const listReservation = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Acceso denegado'});
  };
  
  try {
    const reservation = await listReservationService();
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las reservaciones'});
  }
};

module.exports = { createTimeBlock, listReservation };