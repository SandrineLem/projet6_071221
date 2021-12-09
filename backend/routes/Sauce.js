const express = require('express');
const router = express.Router();

const sauceCtrl = require ('../controllers/Sauce');
const auth = require('../middleware/auth');

router.post('/', auth, sauceCtrl,createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;