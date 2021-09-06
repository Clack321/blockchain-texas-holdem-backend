const { db, convertToObjectId } = require('../DataBaseTool');

module.exports.find = async () => {
    return db().collection('game').find()
}

module.exports.findById = async (_id) => {
    return db().collection('game').find({_id: convertToObjectId(_id)})
}

module.exports.create = async (actionObj, res) => {
    let objectToCreate = {}
    try {
        if (!actionObj.actions) {
            objectToCreate.actions = []
        } else {
            objectToCreate.actions = actionObj.actions;
        }
        if (!actionObj.pot) {
            objectToCreate.pot = 0;
        } else {
            objectToCreate.pot = actionObj.pot;
        }

        if (!actionObj.currentConnectedUsers) {
            objectToCreate.currentConnectedUsers = [];
        } else {
            objectToCreate.currentConnectedUsers = actionObj.currentConnectedUsers;
        }
        if (!actionObj.gameState) {
            objectToCreate.gameState = 'notStarted';
        } else {
            objectToCreate.gameState = actionObj.gameState;
        }
        if (!actionObj.users) {
            objectToCreate.users = [];
        } else {
            objectToCreate.users = actionObj.users;
        }
        if (!actionObj.deckId) {
            throw ' Deck Id Required '
        } else {
            objectToCreate.deckId = (convertToObjectId(actionObj.deckId));
        }
        if (!actionObj.rounds) {
            actionObj.rounds = [];
        } else {
            objectToCreate.rounds = actionObj.rounds;
        }
        return db().collection('game').insert({...objectToCreate})
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
        let objectToUpdate = await db().collection('game').find({_id: convertToObjectId(id)});
        if (actionObj.actions) {
            objectToUpdate.actions = actionObj.actions;
        }
        if (actionObj.pot) {
            objectToUpdate.pot = actionObj.pot;
        }

        if (actionObj.currentConnectedUsers) {
            objectToUpdate.currentConnectedUsers = actionObj.currentConnectedUsers;
        }
        if (actionObj.gameState) {
            objectToUpdate.gameState = actionObj.gameState;
        }
        if (actionObj.users) {
            objectToUpdate.users = actionObj.users;
        }
        if (actionObj.deckId) {
            objectToUpdate.deckId = (convertToObjectId(actionObj.deckId));
        }
        if (actionObj.rounds) {
            objectToUpdate.rounds = actionObj.rounds;
        }
        return db().collection('game').update({_id: convertToObjectId(id)}, { ...objectToUpdate})
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports.delete = async (id, res) => {
    try {
        if (!id) {
            throw 'Card Id Required'
        } else {
            return await db().collection('game').deleteOne({_id: convertToObjectId(id)});
        }
    } catch (e) {
        res.status(413).send(e);
    }
}

// module.exports.createGame = async ()