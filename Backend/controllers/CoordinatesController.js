const Coordinates = require('../models/Coordinates');

// // Controller for creating a new coordinate
// exports.createCoordinate = async (req, res) => {
//     try {
//         const { longitude, latitude, order } = req.body;
//         const coordinate = new Coordinates({ longitude, latitude, order });
//         await coordinate.save();
//         res.status(201).json({ message: 'Coordinate created successfully', coordinate });
//     } catch (error) {
//         console.error('Error creating coordinate:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// Controller for creating a new array of coordinates
exports.createCoordinates = async (req, res) => {
    try {
        const coordinatesData = req.body;
        
        // Check if coordinatesData is an array
        if (!Array.isArray(coordinatesData)) {
            return res.status(400).json({ error: 'Coordinates data must be an array' });
        }

        const coordinates = [];

        // Iterate over each coordinate data and save it
        for (const data of coordinatesData) {
            const { longitude, latitude, order } = data;
            const coordinate = new Coordinates({ longitude, latitude, order });
            await coordinate.save();
            coordinates.push(coordinate);
        }

        res.status(201).json({ message: 'Coordinates created successfully', coordinates });
    } catch (error) {
        console.error('Error creating coordinates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Controller for getting all coordinates
exports.getAllCoordinates = async (req, res) => {
    try {
        const coordinates = await Coordinates.find();
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error getting coordinates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
