const Session = require("../models/Session");

// GET all sessions
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ startTime: 1 });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// CREATE session
exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATE session
exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(session);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE session
exports.deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);

    res.json({
      message: "Session deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Register session

exports.registerSession = async (req, res) => {
  console.log(req.body);
  try {

    const session =
      await Session.findById(req.params.id);

    if (!session) {

      return res.status(404).json({
        message: "Session not found",
      });

    }

    const {
      attendeeId,
      attendeeName,
    } = req.body;

    const alreadyRegistered =
      session.attendees.some(
        (a) =>
          a.attendeeId?.toString() === attendeeId
      );

    if (alreadyRegistered) {

      return res.status(400).json({
        message:
          "Already registered for this session.",
      });

    }

    session.attendees.push({
      attendeeId,
      attendeeName,
    });

    await session.save();

    res.json(session);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};