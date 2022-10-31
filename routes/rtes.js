var express = require('express')
var router = express.Router()
var msg=require('../message')
var jwt = require('jsonwebtoken');
const { oraexec, begintrans,exectrans,committrans } = require('oracledbexec')


router.get('/getData',async function (req, res) {

    try {

        let sql = `SELECT * FROM T_TES`
        var param = []
        let result = await oraexec(sql, param)
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(200).json(msg[1])
}
});



router.post('/saveData', async function (req, res) {
    let rb=req.body;
    try {       
        let sql = `INSERT INTO T_TES(KDSATKER,NMSATKER)
         VALUES (:KDSATKER, :NMSATKER)`

         var values = {
            KDSATKER: rb.KDSATKER,
            NMSATKER: rb.NMSATKER,
           
        }

        let result = await oraexec(sql, values)
        res.status(200).json(msg[3])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/updateData', async function (req, res) {
    let rb=req.body;
    try {       
        let sql = `UPDATE T_TES SET NMSATKER= :NMSATKER 
        WHERE KDSATKER= :KDSATKER`
         var values = {
            NMSATKER: rb.NMSATKER,
            KDSATKER: rb.KDSATKER
        }

        let result = await oraexec(sql, values)
        res.status(200).json(msg[4])

    } catch (error) {
        console.log(error)
        res.status(200).json(msg[1])
    }
});
router.post('/deleteData', async function (req, res) {
    let rb=req.body;
    try {       
        let sql = `DELETE FROM T_TES WHERE KDSATKER= :KDSATKER`
         var values = {
            KDSATKER: rb.KDSATKER
        }

        let result = await oraexec(sql, values)
        res.status(200).json(msg[5])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});


router.post('/tesTransaksi', async function (req, res) {
    console.log('lewat sini')
    let rb=req.body;
    try {       

        let con=await begintrans();

        let sql1 = `INSERT INTO T_TES(KDSATKER,NMSATKER)
        VALUES (:KDSATKER, :NMSATKER)`

        var values1 = {
           KDSATKER: rb.KDSATKER,
           NMSATKER: rb.NMSATKER,
          
       }
        await exectrans(con,sql1,values1)


        let sql2 = `INSERT INTO T_SATU(NAMA)
        VALUES (:NAMA)`

        var values2 = {
           NAMA: rb.NAMA,
          
       }
        await exectrans(con,sql2,values2)
        await committrans(con)
     

        res.status(200).json(msg[3])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/tesTransaksi2', async function (req, res) {
    let rb=req.body;
    try {       

        let con=await begintrans();

        let sql1 = `SELECT * FROM T_TES WHERE KDSATKER= :KDSATKER`

        var values1 = {
           KDSATKER: rb.KDSATKER          
       }
        let hasil1=await exectrans(con,sql1,values1)


        let sql2 = `INSERT INTO T_SATU(NAMA)
        VALUES (:NAMA)`

        var values2 = {
           NAMA: hasil1.rows[0].NMSATKER
          
       }
        await exectrans(con,sql2,values2)
        await committrans(con)
     

        res.status(200).json(msg[3])

    } catch (error) {
        console.log(error)
        res.status(200).json(msg[1])
    }
});

module.exports = router
