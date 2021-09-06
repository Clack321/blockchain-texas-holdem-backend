const { db, convertToObjectId } = require('../DataBaseTool');

module.exports.find = async () => {
    return db().collection('round').find()
}

module.exports.findById = async (_id) => {
    return db().collection('round').find({_id: convertToObjectId(_id)})
}

module.exports.create = async (actionObj, res) => {
    let objectToCreate = {}
    try {
        if (!actionObj.currentBlind) {
            throw 'Current Blind Required'
        } else {
            objectToCreate.currentBlind = actionObj.currentBlind;
        }
        if (!actionObj.currentUserTurn) {
            throw 'Current User Turn Required'
        } else {
            objectToCreate.currentUserTurn = actionObj.currentUserTurn;
        }
        if (!actionObj.pot) {
            objectToCreate.pot = 0;
        } else {
            objectToCreate.potn = actionObj.pot;
        }
        if (!actionObj.pot) {
            objectToCreate.pot = 0;
        } else {
            objectToCreate.pot = actionObj.pot;
        }
        if (!actionObj.flopCards) {
            objectToCreate.flopCards = [];
        } else {
            objectToCreate.flopCards = actionObj.flopCards;
        }
        if (!actionObj.turnCard) {
            objectToCreate.turnCard = {};
        } else {
            objectToCreate.turnCard = actionObj.turnCard;
        }
        if (!actionObj.riverCard) {
            objectToCreate.riverCard = {};
        } else {
            objectToCreate.riverCard = actionObj.riverCard;
        }
        if (!actionObj.phase) {
            objectToCreate.phase = 'initial';
        } else {
            objectToCreate.phase = actionObj.phase;
        }
        if (!actionObj.deckId) {
            throw 'Deck Id is required'
        } else {
            objectToCreate.deckId = actionObj.deckId;
        }
        if (!actionObj.actions) {
            objectToCreate.actions = [];
        } else {
            objectToCreate.actions = actionObj.actions;
        }
        return db().collection('round').insert({...objectToCreate})
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
        let objectToUpdate = await db().collection('round').find({_id: convertToObjectId(id)});
        if (actionObj.currentBlind) {
            objectToUpdate.currentBlind = actionObj.currentBlind;
        }
        if (actionObj.currentUserTurn) {
            objectToUpdate.currentUserTurn = actionObj.currentUserTurn;
        }
        if (actionObj.pot) {
            objectToUpdate.potn = actionObj.pot;
        }
        if (actionObj.pot) {
            objectToUpdate.pot = actionObj.pot;
        }
        if (actionObj.flopCards) {
            objectToUpdate.flopCards = actionObj.flopCards;
        }
        if (actionObj.turnCard) {
            objectToUpdate.turnCard = actionObj.turnCard;
        }
        if (actionObj.riverCard) {
            objectToUpdate.riverCard = actionObj.riverCard;
        }
        if (actionObj.phase) {
            objectToUpdate.phase = actionObj.phase;
        }
        if (actionObj.deckId) {
            objectToUpdate.deckId = actionObj.deckId;
        }
        if (actionObj.actions) {
            objectToUpdate.actions = actionObj.actions;
        }
        return db().collection('round').update({_id: convertToObjectId(id)}, { ...objectToUpdate})
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports.delete = async (id, res) => {
    try {
        if (!id) {
            throw 'Round Id Required'
        } else {
            return await db().collection('round').deleteOne({_id: convertToObjectId(id)});
        }
    } catch (e) {
        res.status(413).send(e);
    }
}