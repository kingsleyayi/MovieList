const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'secretValue')
        req.user = decode
        next()
    } catch (error) {
        if(error.name == "TokenExpiredError"){
            res.status(404).json({
                message: 'Token expired'
            })
        }
        res.json({
            message: 'Authentication Failed'
        })
    }
}

module.exports = authenticate