const { findUser } = require('../utils/utils')

// middleware
const verifyUser = async (req, res, next) => {
    const email = req.headers.email;
    console.log({ email })
    const user = await findUser(email);
    req.user = user;
    next()
}

module.exports = {
    verifyUser
}