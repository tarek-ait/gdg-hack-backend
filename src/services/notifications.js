import Notification from '../db/models/notificationSchema.js';

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
      read: false,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const readNotification = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.notificationId, {
      read: true,
    });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const readAllNotifications = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.params.userId, read: false },
      { read: true },
    );
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
