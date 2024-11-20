const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    try {
    // verify auth
    const authorization = await req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({error: 'authorization token needed'});
    }

    // split jwt token
    const token = await authorization.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: 'invalid authorization format'});
    }
    // verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // attach user information
        req.user = decoded;
    // proceed to the next route
        next(); 
    } catch (error) {
        console.error('authentication error :',error);
        return res.status(401).json({error: 'request is not authorized'})
    }
}

module.exports = requireAuth;