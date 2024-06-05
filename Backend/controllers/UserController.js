const User = require('../models/User'); // Adjust the path as needed


// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const newUser =await  User.create({
      name,
      email,
      password
    });

   
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send({message:"All users",data:users});
    } catch (error) {
      console.error('Error fetching users:', error); // Log the error to the console
      res.status(500).json({ message: 'Server error', error: error.message }); // Include the error message in the response
    }
  };

// Get a user by ID
exports.getUserByemail = async (req, res) => {
  try {
    const {email} = req.params
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).send({message:"user Founded",data:user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
