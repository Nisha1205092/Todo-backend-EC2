const { User } = require('../models/user')

const signinUser = async (req, res) => {
    console.log({ user: req.user })
    if (req.user) {
        return res.json({
            message: 'user signed in'
        })
    }
    return res.status(404).json({ message: 'emailNotFound' })
    //fetchAllTodos(user)
}

const createNewUser = async (req, res) => {
    // create a user document in MongoDB
    const { email, uid } = req.body;
    if (!email || !uid) {
        console.log('undefined??', { email, uid })
        // any of these 'undefined'
        return res.status(404).json({ message: 'email/uid undefined' })
    }
    console.log({ email, uid })
    const username = email.split('@')[0].toUpperCase()
    const user = await User.findOne({ email })

    console.log({ user })
    // this is improbable
    // using firebase auth
    // we handle this case in the frontend
    if (user) {
        return res.status(403).json({ message: 'User already exists' })
    }
    const newUser = new User({ username, email, uid })
    newUser.save()
    return res.json({ message: 'User created successfully' })
}

module.exports = {
    createNewUser,
    signinUser
}