const Query = require("../models/Query");

// Get all queries
exports.getQueries = async (req, res) => {

  try {

    const queries = await Query.find()
      .sort({ createdAt: -1 });

    res.json(queries);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Submit query
exports.createQuery = async (req, res) => {

  try {

    const query = await Query.create(req.body);

    res.status(201).json(query);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Reply
exports.replyQuery = async (req, res) => {

  try {

    const query =
      await Query.findByIdAndUpdate(

        req.params.id,

        {
          reply: req.body.reply,
          status: "Answered",
        },

        {
          new: true,
        }

      );

    res.json(query);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};