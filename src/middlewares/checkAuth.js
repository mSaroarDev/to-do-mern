const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const LoginCookies = req.cookies;
    const token = LoginCookies.session;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;
    req.id = id;
    req.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkAuth;
