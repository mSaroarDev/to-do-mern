const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const splitAuthorization = authorization.split(" ");
    const token = splitAuthorization[1];
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
