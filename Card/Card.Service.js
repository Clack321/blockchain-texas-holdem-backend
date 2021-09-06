const { db, convertToObjectId } = require('../DataBaseTool');

module.exports.find = async () => {
    return db().collection('card').find()
}

module.exports.findById = async (_id) => {
    return db().collection('card').find({_id: convertToObjectId(_id)})
}

module.exports.create = async (actionObj, res) => {
    let objectToCreate = {}
    try {
        if (!actionObj.deckId) {
            throw 'Deck Id Required'
        } else {
            objectToCreate.deckId = actionObj.deckId;
        }
        if (!actionObj.index) {
            throw 'Index is required'
        } else {
            objectToCreate.index = actionObj.index
        }
        if (!actionObj.rank) {
            throw 'Rank Required'
        } else {
            objectToCreate.rank = actionObj.rank;
        }
        if (!actionObj.suit) {
            throw 'Suit Required'
        } else {
            objectToCreate.suit = actionObj.suit;
        }
        return db().collection('card').insert({...objectToCreate})
    } catch(e) {
        res.status(413).send(e)
    }
}

module.exports.update = async (id, actionObj, res) => {
    try {
        if (!id) {
            throw 'Card Id Required'
        } 
    } catch (e) {
        res.status(413).send(e);
    }
    try {
        let objectToUpdate = await db().collection('card').find({_id: convertToObjectId(id)});
        if (actionObj.deckId) {
            objectToUpdate.deckId = actionObj.deckId;
        }
        if (actionObj.index) {
            objectToUpdate.index = actionObj.index
        }
        if (actionObj.rank) {
            objectToUpdate.rank = actionObj.rank;
        }
        if (actionObj.suit) {
            objectToUpdate.suit = actionObj.suit;
        }
        return db().collection('card').update({_id: convertToObjectId(id)}, { ...objectToUpdate})
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports.delete = async (id, res) => {
    try {
        if (!id) {
            throw 'Card Id Required'
        } else {
            return await db().collection('card').deleteOne({_id: convertToObjectId(id)});
        }
    } catch (e) {
        res.status(413).send(e);
    }
}