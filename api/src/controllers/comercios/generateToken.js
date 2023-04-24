const jwt = require('jsonwebtoken')

const generateToken = (commerce) => {
    return jwt.sign(
        {
            id: commerce.id,
            email: commerce.email
        },
        'secret',
        {
            expiresIn: '7d'
        }
    )
}

module.exports = {
    generateToken
}