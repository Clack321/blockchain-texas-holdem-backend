const { db, convertToObjectId } = require('../DataBaseTool');

module.exports.find = async () => {
    return db().collection('action').find()
}

module.exports.findById = async (_id) => {
    return db().collection('action').find({_id: convertToObjectId(_id)})
}

module.exports.create = async (actionObj, res) => {
    let objectToCreate = {}
    try {
        if (!actionObj.userId) {
            throw 'User Id required'
        } else {
            objectToCreate.userId = actionObj.userId;
        }
        if (!actionObj.roundId) {
            throw 'Round Id required'
        } else {
            objectToCreate.roundId = actionObj.roundId
        }
        if (!actionObj.type) {
            throw 'Type required'
        } else {
            objectToCreate.type = actionObj.type;
        }
        if (actionObj.amount) {
            objectToCreate.amount = actionObj.amount;
        }
        return db().collection('action').insert({...objectToCreate})
    } catch(e) {
        res.status(413).send(e)
    }
}

module.exports.update = async (id, actionObj, res) => {
    try {
        if (!id) {
            throw 'Action Id Required'
        } 
    } catch (e) {
        res.status(413).send(e);
    }
    try {
        let objectToUpdate = await db().collection('action').find({_id: convertToObjectId(id)});
        if (actionObj.userId) {
            objectToUpdate.userId = actionObj.userId;
        }
        if (actionObj.roundId) {
            objectToUpdate.roundId = actionObj.roundId;
        } 
        if (actionObj.type) {
            objectToUpdate.type = actionObj.type;
        } 
        if (actionObj.amount) {
            objectToUpdate.amount = actionObj.amount;
        }
        return db().collection('action').update({_id: convertToObjectId(id)}, {...objectToUpdate})
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports.delete = async (id, res) => {
    try {
        if (!id) {
            throw 'Action Id Required'
        } else {
            return await db().collection('action').deleteOne({_id: convertToObjectId(id)});
        }
    } catch (e) {
        res.status(413).send(e);
    }
}