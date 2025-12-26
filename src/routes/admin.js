const { Router } = requiere('express');
const { createTimeBlocks, listReservation } = require('../controllers/adminController');

const router = Router();

router.post('/time-blocks', createTimeBlocks);
router.get('/reservations', listReservation);