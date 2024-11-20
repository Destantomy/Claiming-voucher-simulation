const express = require('express');
const router = express.Router();
const { getVouchersData, claimVoucherById, removeVoucherById } = require('../controllers/voucherController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
// get all vouchers
router.get('/vouchers', getVouchersData);
// claiming a voucher
router.post('/vouchers/claim/:id_voucher', claimVoucherById);
// removeing a voucher
router.delete('/vouchers/remove/:id_voucher', removeVoucherById);

module.exports = router;