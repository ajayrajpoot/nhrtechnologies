const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {

    console.log("----->", err)
    console.log("----->", err.message)
    if(err.message == 'jwt expired') {
      res.status(440).json({ Result: false, Message: err.message})
    } else {
      res.status(500).json({ Result: false, Message: err.message})

    } 
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.UserId = decodedToken.UserId; 
  req.Role = decodedToken.Role; 
  
  next();
};
