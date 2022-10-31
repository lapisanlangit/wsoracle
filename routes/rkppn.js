var express = require('express')
var router = express.Router()
var msg=require('../message')
var jwt = require('jsonwebtoken');
const { oraexec, oraexectrans,beginTrans,execTrans,commitTrans } = require('oracledbexec')


router.get('/getKPPN',async function (req, res) {

    try {

        let sql = `SELECT * FROM T_KPPN`
        var param = []
        let result = await oraexec(sql, param)
        console.log(result.rows)
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(200).json(msg[1])
}
});



router.post('/saveKPPN', async function (req, res) {
    let rb=req.body;
    try {       
        let sql = `INSERT INTO T_KPPN(KDKPPN,NMKPPN)
         VALUES (:KDKPPN, :NMKPPN)`

         var values = {
            KDKPPN: rb.KDKPPN,
            NMKPPN: rb.NMKPPN,
           
        }

        let result = await oraexec(sql, values)
        res.status(200).json(msg[3])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/updateKPPN', async function (req, res) {
    let rb=req.body;
    try {       
        let sql = `UPDATE T_KPPN SET NMKPPN= :NMKPPN 
        WHERE KDKPPN= :KDKPPN`
         var values = {
            NMKPPN: rb.NMKPPN,
            KDKPPN: rb.KDKPPN
        }

        let result = await oraexec(sql, values)
        res.status(200).json(msg[4])

    } catch (error) {
        console.log(error)
        res.status(200).json(msg[1])
    }
});
router.post('/deleteKPPN', async function (req, res) {
    let rb=req.body;
    try {       
        let sql = `DELETE FROM T_KPPN WHERE KDKPPN= :KDKPPN`
         var values = {
            KDKPPN: rb.KDKPPN
        }

        let result = await oraexec(sql, values)
        res.status(200).json(msg[5])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});



module.exports = router
