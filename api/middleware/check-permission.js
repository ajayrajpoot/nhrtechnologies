const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const publicUrl = [{ method: 'GET', url: '/login' }]
  // console.log( 'Role', req.originalUrl); 
  // console.log( 'Role', req._parsedUrl); 
  // console.log( 'Role', req._parsedUrl.pathname); 
  // console.log( 'Role', req.pathname); 
  // console.log( 'Role', req.method); 


  const UserId = req.UserId;
  const Role = req.Role;
  const pathname = req._parsedUrl.pathname;
  const method = req.method;

  // console.log('UserId', UserId);
  // console.log('Role', Role);
  // console.log('pathname', pathname);
  // console.log('method', method);


  const fURL = publicUrl.filter(data => data.url == pathname)
  const fmethod = fURL.filter(data => data.method == method)

  if (fmethod.length) { 
    next() 
  } else if (method == 'GET' && ['RO', 'VE'].includes(Role)) {
    next();
  } else if ((method != 'GET' && Role == 'VE')) {
    next();
  } else {
    // 403 Forbidden
    res.status(403).json({ Result: false, Message: 'not have access rights' });
  }




};
