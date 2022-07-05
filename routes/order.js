const express = require('express');
const router = express.Router();
const connection = require("../database/conn")

router.get('/', function(req, res, next) {
    let sql = "SELECT * FROM Category";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        return res.status(200).json(results);
    })
});

module.exports = router;
