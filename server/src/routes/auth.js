const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// ------------------------     Creating User "api/auth/signup"
router.post(
  "/signup",

  // VALIDATION
  [
    body("email").isEmail(),
    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
    body("password").isLength({ min: 6 }),
  ],

  //Main function
  async (req, res) => {
    try {
      
     let success = false;
      const { password,
         name,
          mobile,
          email,
          dob,
         doj,
          ad,
          role,
          address,
          pincode,
          city,
          skillset,
          code,
          gender,
          salary,
          dept
        } = req.body;
      const errors = validationResult(req);


      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Checking whether user already exists or not
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json("User Already Exists");
      }

      // encrypting the password
      var salt = await bcrypt.genSaltSync(10);
      var secPassword = await bcrypt.hashSync(password, salt);
      
      user = await User.create({
        name,
        email,
        password: secPassword,
        mobile,
        dob,
        doj,
        ad,
        role,
        address,
        pincode,
        city,
        skillset,
        code,
        gender,
        salary,
        dept
      });

      // Using id to create token
      let data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, privateKey);

      // Giving successful response
      success = true;
      res.json({ token, success });
    } catch (error) {
      return res
        .status(400)
        .json({ Error: error, Message: "Internal Server Error" });
    }
  }
);


// ------------------------     Authenticate User  "api/auth/login"
router.post(
  "/login",
  [body("email").isEmail(), body("password", "it can not be blank").exists()],
  async (req, res) => {
    // validation of email and paasword
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    // cheching for email exits or not
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }

    // checking whether password matches or not
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }



    // JWT authentication
      const data = {
        user: {
          id: user.id,
          name:user.name
        },
      };

      const token = jwt.sign(data, process.env.PRIVATE_KEY);
      res.json({ token , user});

    } catch (err) {
      
      res.json({ error: "internal Server Error", err: err.message });
    }
  }
);

module.exports = router;
