var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CoordSchema = new Schema ({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    order: {
        type: Number, 
        required: true
    }
});

var Coordinates = mongoose.model("Coordinates", CoordSchema,"Coordinates");

module.exports = Coordinates;