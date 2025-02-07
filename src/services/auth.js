import { generateToken } from '../config/utils.js';
import User from '../db/models/userSchema.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { userName,firstName,lastName, email, password } = req.body;
  try {
    if (!userName|| !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters' });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: 'User created successfully',
        _id: newUser._id,
        userName: newUser.userName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    generateToken(user._id, res);
    res.status(200).json({
      message: 'User logged in successfully',
      _id: user._id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic} = req.body;
    const userID = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// function to get the user infos, the projects, socials 
// except the password 
export const getUserProfile = async (req, res) => {
  try {
    const userID = req.user.get('id');
    const user = await User.findById(userID)
    .populate('createdProjects')
    .populate('joinedProjects');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // exclude the password 
    const { password, ...userInfo } = user.toObject();
    res.status(200).json(userInfo);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};  

// function to assing the user field of interest
export const addFieldOfInterest = async (req, res) => {
  try {
    const userID = req.user.get('id');
    const { fieldOfInterest } = req.body; // array of strings 
    if (!fieldOfInterest) {
      return res.status(400).json({ message: 'Field of interest is required' });
    }
    const user =
    await User.findByIdAndUpdate(
      userID,
      { fieldOfInterest },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.fieldsOfInterest = [...new Set([...user.fieldsOfInterest, ...fieldOfInterest])];
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}
