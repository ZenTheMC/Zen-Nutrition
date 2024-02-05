import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        req.user = decoded.userId;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export default requireAuth;
