require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../util/models");

// JWT Handler
const jwtHandler = (emailAddress, id) => {
  return jwt.sign({ emailAddress, id }, JWT_SECRET_KEY, {
    expiresIn: 86400000,
  }); // 24hr exp
};

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, emailAddress, password } = req.body;

      let foundUser = await User.findOne({
        where: { email_address: emailAddress },
      });

      if (foundUser) {
        res.status(400).send("User already exists");
      } else {
        // Auto generate salt and hash all-in-one
        const hash = bcrypt.hashSync(password, 5);

        // Create new user
        const newUser = await User.create({
          email_address: emailAddress,
          hashed_pass: hash,
          first_name: firstName,
          last_name: lastName,
        });
        console.log(newUser);

        // Create token with new user data
        const token = jwtHandler(
          newUser.dataValues.email_address,
          newUser.dataValues.id
        );

        // Set exp to 24 hours from now
        const exp = Date.now() + 86400000;

        // Respond with new user data
        //! Can access newUser data without including .dataValues 
        res.status(200).send({
          token,
          exp,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
          userId: newUser.id,
        });
      }
    } catch (err) {
      console.log("Error registering user");
      console.log(err);
      res.sendStatus(400);
    }
  },

  login: async (req, res) => {
    try {
      const { emailAddress, password } = req.body; // Desctructure request body

      let foundUser = await User.findOne({
        where: { email_address: emailAddress },
      }); // Finds user in db

      // userAuthenticated compares passwords and returns boolean
      if (foundUser) {
        const userAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashed_pass
        );
        // Creates token IF user is authenticated
        if (userAuthenticated) {
          const token = jwtHandler(
            foundUser.dataValues.email_address,
            foundUser.dataValues.id
          );

          const exp = Date.now() + 86400000; // Sets expiration to 24 hrs

          // Sends data to be used in login handler on frontend
          res.status(200).send({
            userId: foundUser.dataValues.id,
            token: token,
            exp: exp,
            firstName: foundUser.dataValues.first_name,
            lastName: foundUser.dataValues.last_name,
          });
        } else {
          console.log("Incorrect password");
          res.sendStatus(400);
        }
      } else {
        console.log("User not found");
        res.sendStatus(400);
      }
    } catch (err) {
      console.log("Error logging in");
      console.log(err);
      res.sendStatus(400);
    }
  },
};
