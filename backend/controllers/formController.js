const Message = require('../models/Message');

exports.submitMessage = async function (req, res, next) {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({
      name: name,
      email: email,
      message: message,
    });

    await newMessage.save();

    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit message' });
  }
};
