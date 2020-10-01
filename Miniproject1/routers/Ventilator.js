const express = require('express');
const router = express.Router()
const middleware = require('../MiddleWare/middleware');
const VentilatorSchema = require("../models/ventilatorSchema");

//get all ventilator
router.get("/getVentilators", middleware.checkToken, async(req, res) => {

    try {
        const data = await VentilatorSchema.find();
        res.json(data);
    } catch (err) {
        res.send("Error " + err);
    }
});

//get ventilator by id
router.get("/getVentilatorById/:id", middleware.checkToken, async(req, res) => {
    try {
        const data = await VentilatorSchema.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.send("Error " + err);
    }
});

//get ventilator by status
router.post("/getVentilatorByStatus", middleware.checkToken, async(req, res) => {
    try {
        VentilatorSchema.find({ status: req.body.status }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    } catch (err) {
        res.send("Error " + err);
    }
});

//get ventilator by HospitalName
router.post("/getVentilatorByHospitalName", middleware.checkToken, async(req, res) => {
    try {
        VentilatorSchema.find({ name: new RegExp(req.body.name, 'i') }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    } catch (err) {
        res.send("Error " + err);
    }
});


//update ventilator info by id
router.patch("/updateVentilatorStatusById/:id", middleware.checkToken, async(req, res) => {
    try {
        const data = await VentilatorSchema.findById(req.params.id);
        data.status = req.body.status;
        const d = await data.save();
        res.json(d);
    } catch (err) {
        res.send("Error " + err);
    }
});

//add ventilator details
router.post("/addVentilator", middleware.checkToken, async(req, res) => {
    try {
        const data = new VentilatorSchema({
            hId: req.body.hId,
            ventilatorId: req.body.ventilatorId,
            status: req.body.status,
            name: req.body.name
        });
        const d = await data.save();
        res.json(d);

    } catch (err) {
        send.post(err);
    }
});

//delete ventilator details by id
router.delete("/deleteVentilatorById/:id", middleware.checkToken, async(req, res) => {
    try {
        const data = await VentilatorSchema.findById(req.params.id);
        const res = await data.remove();
        res.json(res);
    } catch (err) {
        res.send(err);
    }
});

//delete ventilator details by ventId
router.delete("/deleteVentilatorByVentId", middleware.checkToken, async(req, res) => {
    try {
        const data = await VentilatorSchema.find({ ventilatorId: req.body.ventilatorId });
        const res = await data.remove();
        res.json(res);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;