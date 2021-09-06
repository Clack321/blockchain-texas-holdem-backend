const { db } = require('../DataBaseTool');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
 module.exports.find = async () => {
    return db().collection('user').find()
}

module.exports.findById = async (_id) => {
    return db().collection('user').find({_id: convertToObjectId(_id)})
}

module.exports.register = async (body, res) => {
    let userObj = {};
    let shouldCreate = true;
    try {
        if (!body.email) {
            throw 'Email Is Required';
        } else {
            const foundUser = await db().collection('user').findOne({email: body.email});
            if (foundUser) {
                throw 'email already in use';
            }
            userObj.email = body.email;
        }
        if (!body.username) {
            throw 'Username Is Required';
        } else {
            const foundUser = await db().collection('user').findOne({username: body.username});
            if (foundUser) {
                throw 'Username already in use';
            }
            userObj.username = body.username;
        }
        if (!body.amount) {
            userObj.amount = 0.0000001;
        } else {
            userObj.amount = body.amount;
        }
        if (!body.role) {
            userObj.role = 'user';
        } else {
            userObj.role = body.role;
        }
        if (!body.currency) {
            userObj.currency = 'usd';
        } else {
            userObj.currency = body.currency;
        }
        if (!body.password) {
            throw 'Password Is Required';
        } else {
            userObj.password = await bcrypt.hash(body.password, 10);
        }
    } catch (e) {
        res.status(413).send(e)
        shouldCreate = false;
    }
    try {
        if (shouldCreate) {
            await db().collection('user').insertOne({...userObj});
            return userObj;
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports.login = async (body, res) => {
    try {
        if (!body.email) {
            throw 'Email Is Required'
        }
        if (!body.password) {
            throw 'Password is Required'
        }
    } catch (e) {
        res.status(413).send(e);
    }
    let user;
    try {
        [ user ] = await db().collection('user').find({email: body.email}).toArray();
    } catch (e) { 
        res.status(500).send(e.message);
    }
    try {
        const isVerified = await bcrypt.compare(body.password, user.password);
        if (isVerified) {
            const _user = {
                email: user.email,
                id: user._id,
                username: user.username,
                currency: user.currency,
                role: user.role,
                amount: user.amount,
            };
            return {
                token: jwt.sign(_user, process.env.secret),
                user: _user,
            };
        } else {
            res.status(401).send('Incorrect Password')
        }
    } catch (e) {
        res.status(500).send(e.message)
    }

}