const jsonwebtoken = require('jsonwebtoken');
module.exports.validateAuthToken = async (req,res,next) => {
    try {
        if (req.headers && req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.secret, function(err, decode) {
              if (err) req.user = undefined;
              req.user = decode;
              next();
            });
          } else {
            req.user = undefined;
            res.status(401).send('You are not authorized');
          }
    } catch (error) {
        console.error(error);
        res.status(401).send('You are not authorized');
        // handleError(res, AppErrors.notAllowed('User Does Not Have Permission To View Charts'))
    }
};