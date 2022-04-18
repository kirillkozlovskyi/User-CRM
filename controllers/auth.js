const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (!candidate) {
        res.status(404).json({massage: 'User with this email not found'})
    } else {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                id: candidate._id,
            }, keys.jwt, {expiresIn: 60 * 60});
            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({message: 'Password did not match'})
        }
    }
}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        res.status(409).json({massage: 'User already exists'})
    } else  {
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        });
        try {
            await user.save();
            res.status(201).json({massage: 'User created!', user})
        } catch (e) { errorHandler(res, e) }
    }
}