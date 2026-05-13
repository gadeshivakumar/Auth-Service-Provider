const jwt=require('jsonwebtoken')

const oauthMiddleware = (
  req,
  res,
  next
) => {

  const token = req.cookies.token;

  if (!token) {
    return res.redirect(
      `${process.env.CLIENT_URL}/login?next=${encodeURIComponent(req.originalUrl)}`
    );
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  req.user = decoded;

  next();

};

module.exports = oauthMiddleware;