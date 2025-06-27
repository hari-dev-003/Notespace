const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');

let pems = {};

async function getPems(userPoolId, region) {
  const url = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
  const { data } = await axios.get(url);

  data.keys.forEach(key => {
    const pem = jwkToPem(key);
    pems[key.kid] = pem;
  });
}

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  if (!token) return res.status(401).send('No token provided');

  const decoded = jwt.decode(token, { complete: true });
  if (!decoded) return res.status(401).send('Invalid token');

  const pem = pems[decoded.header.kid];
  if (!pem) return res.status(401).send('Invalid token');

  jwt.verify(token, pem, (err, payload) => {
    if (err) return res.status(401).send('Token verification failed');
    req.user = payload;
    next();
  });
}

module.exports = { getPems, verifyToken };