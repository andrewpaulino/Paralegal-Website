var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    res.render('services')
})
router.get('/marital', (req,res) => {
    res.render('Martial')
})
router.get('/deeds', (req,res) => {
    res.render('deeds')
})
router.get('/trust', (req,res) => {
    res.render('trust')
})
router.get('/law-order', (req,res) => {
    res.render('law')
})
router.get('/estate', (req,res) => {
    res.render('estate')
})
router.get('/personal', (req,res) => {
    res.render('personal')
})
router.get('/service', (req,res) => {
    res.render('service')
})


module.exports = router;