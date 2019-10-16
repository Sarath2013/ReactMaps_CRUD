const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();
const Locations = require('./models/locations');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(4000, () => {
        console.log("Server is listening on port 4000");
    });
}).catch((err) => {
    console.log(err);
});

app.get('/getMarkers', (req, res) => {
    Locations.find((err, data) => {
        if (err) return res.status(500).send({ success: false, error: err });
        return res.json({ success: true, locations: data });
    });
});

app.post('/createMarker', (req, res) => {
    let location = new Locations();

    const { name, lat, lng } = req.body;

    if (!name || lat == undefined || lng == undefined) {
        return res.status(400).send({
            success: false,
            error: 'Not a valid request data',
        });
    }
    location.name = name;
    location.lat = lat;
    location.lng = lng;
    location.save((err, data) => {
        if (err) return res.status(400).send({ success: false, error: err });
        return res.status(201).send({ success: true, location: data });
    });
});

app.put('/editMarker/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({
            success: false,
            error: 'Not a valid request data',
        });
    }
    Locations.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) return res.status(400).send({ success: false, error: err });
        return res.status(202).send({
            error: false,
            message: "Marker updated successfully"
        })
    });
});

app.delete('/deleteMarker/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({
            success: false,
            error: 'Not a valid request data',
        });
    }
    Locations.findByIdAndRemove(id, (err, data) => {
        if (err) return res.status(400).send({ success: false, error: err });
        return res.status(202).send({
            error: false,
            message: "Marker deleted successfully"
        })
    });
});

