const Contact = require("../models/Contact");

// ====================================
// Get Contact Information
// ====================================

const getContact = async (req, res) => {

  try {

    let contact = await Contact.findOne();

    // Create an empty document the first time
    if (!contact) {

      contact = await Contact.create({});

    }

    res.json(contact);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ====================================
// Update Contact Information
// ====================================

const updateContact = async (req, res) => {

  try {

    let contact = await Contact.findOne();

    if (!contact) {

      contact = await Contact.create(req.body);

    } else {

      contact = await Contact.findByIdAndUpdate(
        contact._id,
        req.body,
        {
          new: true,
        }
      );

    }

    res.json(contact);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  getContact,

  updateContact,

};