const express = require('express')
const router = express.Router()
const HospitalSchema = require("../models/hospitalSchema")
let middleware = require('../MiddleWare/middleware');

// get all hospitals
router.get('/getHospitals', middleware.checkToken, async(req, res) => {
    try {
        const data = await HospitalSchema.find();
        res.json(data);
    } catch (err) {
        res.send('Error ' + err);
    }
});

//add hospital details
router.post('/addHospital', middleware.checkToken, async(req, res) => {
    const h = new HospitalSchema({
        hId: req.body.hId,
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
        contactNo: req.body.contactNo
    });
    try {
        const data = await h.save()
        res.json(data);
    } catch (err) {
        res.send('Error ' + err);
    }
});

//get hospital by id
router.get('/getHospitalsById/:id', middleware.checkToken, async(req, res) => {
    try {
        const data = await HospitalSchema.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.send('Error ' + err);
    }
});

//get hospital by HospitalName
router.post("/getHospitalByHospitalName", middleware.checkToken, async(req, res) => {
    try {
        HospitalSchema.find({ name: new RegExp(req.body.name, 'i') }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    } catch (err) {
        res.send("Error " + err);
    }
});

//update hospital info by id
router.patch('/updateHospitalsContactNoById:id', middleware.checkToken, async(req, res) => {
    try {
        const data = await HospitalSchema.findById(req.params.id);
        data.contactNo = req.body.contactNo;
        const d = await data.save();
        res.json(d);
    } catch (err) {
        res.send('Error ' + err);
    }
});

//delete hospital details
router.delete('/deleteHospitalById/:id', middleware.checkToken, async(req, res) => {
    try {
        const data = await HospitalSchema.findById(req.params.id);
        const d = await data.remove();
        res.json(d);
    } catch (err) {
        res.send('Error ' + err);
    }
});

module.exports = router