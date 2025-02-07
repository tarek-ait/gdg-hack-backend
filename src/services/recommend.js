import User from '../db/models/userSchema.js';
import Project from '../db/models/projectSchema.js';

export const projects = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const projects = await Project.find({
      projectCategory: { $in: user.fieldsOfInterest },
      _id: { $nin: [...user.createdProjects, ...user.joinedProjects] },
      status: 'Open',
    }).limit(10);

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const teammates = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const teammates = await User.find({
      _id: { $ne: userId },
      fieldsOfInterest: { $in: user.fieldsOfInterest },
    })
      .limit(10)
      .select('-password');

    res.status(200).json({ teammates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
