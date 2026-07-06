const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ========================================
// Register
// ========================================

const register = async (req, res) => {

  try {

    const {

      name,
      email,
      password,
      organization,
      designation,
      phone,
      role,
      organizerAccessCode,

    } = req.body;

    // Check if user already exists

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {

      return res.status(409).json({

        success: false,

        message:
          "User already registered. Please login.",

      });

    }

    // Organizer validation

    if (role === "organizer") {

      if (
        organizerAccessCode !==
        "WISE2026ADMIN"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid Organizer Access Code.",

        });

      }

    }

    // Hash Password

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      organization,

      designation,

      phone,

      role: role || "attendee",

    });

    res.status(201).json({

      success: true,

      message:
        "Registration successful.",

      user,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ========================================
// Login
// ========================================

const login = async (req, res) => {

  try {

    const {

      email,

      password,

      role,

    } = req.body;

    const user = await User.findOne({

      email,

    });

    if (!user) {

      return res.status(401).json({

        success: false,

        message: "User not found.",

      });

    }

    const validPassword =
      await bcrypt.compare(

        password,

        user.password

      );

    if (!validPassword) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid password.",

      });

    }

    // Check selected role

    if (user.role !== role) {

      return res.status(401).json({

        success: false,

        message:
          "Please login using the correct role.",

      });

    }

    res.json({

      success: true,

      message: "Login successful.",
        user: {

            _id: user._id,

            name: user.name,

            email: user.email,

            phone: user.phone,

            organization: user.organization,

            designation: user.designation,

            profileImage: user.profileImage,

            role: user.role,

            },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ========================================
// Get Profile
// ========================================

const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found.",

      });

    }

    res.json({

      success: true,

      user,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ========================================
// Update Profile
// ========================================

const updateProfile = async (req, res) => {

  try {

    const {

      name,

      phone,

      organization,

      designation,

    } = req.body;

    const user = await User.findByIdAndUpdate(

      req.params.id,

      {

        name,

        phone,

        organization,

        designation,

      },

      {

        new: true,

      }

    ).select("-password");

    res.json({

      success: true,

      message: "Profile updated successfully.",

      user,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ====================================
// Upload Profile Photo
// ====================================

const uploadProfilePhoto = async (
    req,
    res
) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No image selected.",

            });

        }

        const user =
            await User.findByIdAndUpdate(

                req.params.id,

                {

                    profileImage:
                        req.file.path.replace(
                            "\\",
                            "/"
                        ),

                },

                {

                    new: true,

                }

            );

        res.json({

            success: true,

            user,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {

  register,

  login,

  getProfile,

  updateProfile,

  uploadProfilePhoto,

};