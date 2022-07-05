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

router.get('/:id', function(req, res, next) {
    const id = req.params["id"];
    let sql = "SELECT COUNT(Id) AS Sum FROM `Product` WHERE Product.CategoryId = ?";
    connection.query(sql, id, function(err, results) {
        if (err) throw err;
        console.log(id)
        return res.status(200).json(results);
    })
});

router.post('/', function(req, res, next) {
    let sql = 'INSERT INTO Category (Name) VALUES (?)';
    connection.query(sql,req.body.Name, function(err, results) {
        if (err) throw err;
        return res.status(200).json(results);
    })
});

module.exports = router;
