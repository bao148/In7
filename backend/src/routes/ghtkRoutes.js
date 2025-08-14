const express = require('express');
const router = express.Router();
const { calculateShippingFee } = require('../controllers/ghtkController');

router.post('/calculate-fee', async (req, res) => {
    try {
        const data = req.body;
        const result = await calculateShippingFee(data);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// router.post('/create-order', ghtkController.createOrder);

module.exports = router;
