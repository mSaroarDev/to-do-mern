const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const cookie = req.headers.authorization;
    const splitAuthorization = cookie.split(" ");
    const token = splitAuthorization[1];
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;
    req.id = id;
    req.email = email;
    next();
  } catch (error) {
    next("Authorization Failed");
  }
};

module.exports = checkAuth;
