const Zone = require('../models/Zone');
const Coordinates = require('../models/Coordinates');

// Get all zones
// Get all zones
exports.getAllZones = async (req, res) => {
    try {
        const zones = await Zone.find().exec();

        const zonesWithCoordinates = await Promise.all(zones.map(async (zone) => {
            const coordinatesDetails = await Coordinates.find({
                _id: { $in: zone.coordinates }
            }).exec();

            return (
               coordinatesDetails.map(coord => ({
                    longitude: coord.longitude,
                    latitude: coord.latitude,
                    order: coord.order
                }))
            );
        }));

        res.status(200).json(zonesWithCoordinates);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
};

exports.getAllTypeZones = async (req, res) => {
    try {
        const zones = await Zone.find().select('typeZone -_id');

        const types = zones.map(zone => zone.typeZone);

        res.status(200).json(types);
    } catch (error) {
        console.error('Error fetching typeZone values:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllZoneIds = async (req, res) => {
    try {
        // Query to find all zones and select only the _id field
        const zones = await Zone.find().select('_id');

        // Map the zones to extract the _id values
        const ids = zones.map(zone => zone._id);

        // Respond with the array of _id values
        res.status(200).json(ids);
    } catch (error) {
        // Log any errors and send a server error response
        console.error('Error fetching zone IDs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Get a single zone by ID

exports.getZoneById = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Zone ID' });
      }
  
      const zone = await Zone.findById(id);
      if (!zone) {
        return res.status(404).json({ message: 'Zone not found' });
      }
  
      res.status(200).json(zone);
    } catch (error) {
      console.error('Error fetching zone:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// Define controller function for creating a new zone with coordinates
exports.createZone = async (req, res) => {
    try {
        // Extract coordinates array from the request body
        const { coordinates , typeZone } = req.body;

        // Validate that coordinates is an array
        if (!Array.isArray(coordinates)) {
            return res.status(400).json({ error: "Coordinates must be an array" });
        }

        // Create an array to store new Coordonnees objects
        const newCoordinatesArray = [];

        // Loop through each coordinate object in the array
        for (const coord of coordinates) {
            // Extract longitude, latitude, and order from the coordinate object
            const { longitude, latitude, order } = coord;

            // Create a new Coordonnees object with the extracted data
            const newCoordinates = new Coordinates({
                longitude,
                latitude,
                order,
            });

            // Save the new Coordonnees object to the database
            const savedCoordinates = await newCoordinates.save();

            // Push the saved Coordonnees object to the array
            newCoordinatesArray.push(savedCoordinates._id);
        }

        // Create a new Zone object with the array of Coordonnees object IDs
        const newZone = new Zone({
            coordinates: newCoordinatesArray,
            typeZone
        });

        // Save the new zone to the database
        const savedZone = await newZone.save();

        // Respond with the saved zone
        res.status(201).json(savedZone);
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


// Update a zone by ID
exports.updateZone = async (req, res) => {
    const { coordinates } = req.body;

    if (coordinates && !Array.isArray(coordinates)) {
        return res.status(400).json({ message: "Coordinates must be an array of ObjectId references" });
    }

    try {
        const updatedZone = await Zone.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedZone) return res.status(404).json({ message: "Zone not found" });
        res.status(200).json(updatedZone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteZoneById = async (req, res) => {
    try {
        const { id } = req.params;

        const zone = await Zone.findByIdAndDelete({_id:id});
        if (!zone) {
            return res.status(404).json({ message: 'Zone not found' });
        }

        res.status(200).json({ message: 'Zone deleted successfully' });
    } catch (error) {
        console.error('Error deleting zone:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
