const db = require('../database/connection');

const getVouchersData = async (req, res) => {
    try {
        const getVouchersQuery = 'SELECT * FROM tb_voucher';
        db.query(getVouchersQuery, async(error, result) => {
            if (error) {
                console.error('error db :', error);
            }
            return res.status(200).json({result});
        });
    } catch (error) {
        console.error('error :', error);
        return res.status(500).json({json: 'internal server error'});
    }
}

const claimVoucherById = async (req, res) => {
    try {
        const { id_voucher } = req.params;
        // checking possible id_voucher is exist in tb_claim
        const checkClaimQuery = `SELECT * FROM tb_claim WHERE id_voucher = ?`;
        db.query(checkClaimQuery, [id_voucher], async (error, result) => {
            if (error) {
                console.error('error db : ', error)
                return res.status(500).json({error: 'internal server error'});
            }
            if (result.length > 0) {
                return res.status(400).json({ message: 'voucher already claimed' });
            }
        // update status selected voucher in tb_voucher
        const updateVoucherQuery = `UPDATE tb_voucher SET status = 1 WHERE id = ?`;
        const updateResult = await db.execute(updateVoucherQuery, [id_voucher]);
        // checking if there were no any affected rows
        if(updateResult.affectedRows === 0) {
            return res.status(404).json({message: 'voucher not found'});
        }
        // insert data into tb_claim
        const insertClaimQuery = `INSERT INTO tb_claim (id_voucher, tanggal_claim) VALUES (?, ?)`;
        const claimedDate = new Date();
        await db.execute(insertClaimQuery, [id_voucher,claimedDate]);
        return res.status(200).json({message: 'voucher claimed'});
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'internal server error',
            error: error,
        });
    }
}

const removeVoucherById = async (req, res) => {
    try {
        const { id_voucher } = req.params;
        // checking voucher is exist in tb_claim
        const checkVoucherQuery = `SELECT * FROM tb_claim WHERE id_voucher = ?`;
        db.query(checkVoucherQuery, [id_voucher], async (error, result) => {
            if (error) {
                console.error('error db : ', error)
                return res.status(500).json({error: 'internal server error'});
            }
            if (result.length === 0) {
                return res.status(400).json({ message: 'voucher not found in claims' });
            }
        // update status selected voucher in tb_voucher
        const updateVoucherStatus = `UPDATE tb_voucher SET status = 0 WHERE id = ?`;
        db.query(updateVoucherStatus, [id_voucher], (error, result) => {
            if(error) {
                console.error('error in updating voucher status :', error);
                return res.status(500).json({message: 'internal server error'});
            }
            if(result.affectedRows === 0) {
                return res.status(404).json({message: 'voucher not found'});
            }
        })
        // remove claimed voucher in tb_claim
        const removeClaimedVoucher = `DELETE FROM tb_claim WHERE id_voucher = ?`;
        db.query(removeClaimedVoucher, [id_voucher], (error, result) => {
            if(error) {
                console.error('error removing claimed voucher', error);
                return res.status(500).json({message: 'internal server error'});
            }
                return res.status(200).json({
                    message: 'voucher removed successfully',
                    result: result,
                });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'internal server error',
            error: error,
        });
    }
}

module.exports = {getVouchersData, claimVoucherById, removeVoucherById};