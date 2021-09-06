const { db, convertToObjectId } = require('../DataBaseTool');

module.exports.find = async () => {
    return db().collection('deck').find()
}

module.exports.findById = async (_id) => {
    return db().collection('deck').find({_id: convertToObjectId(_id)})
}

module.exports.create = async (actionObj, res) => {
    let objectToCreate = {}
    try {
        if (!actionObj.deckCards) {
            throw 'Deck Cards Required'
        } else {
            objectToCreate.deckCards = actionObj.deckCards;
        }
        if (actionObj.flopCard) {
            objectToCreate.flopCard = actionObj.flopCard;
        }
        if (actionObj.turnCard) {
            objectToCreate.turnCard = actionObj.turnCard;
        }
        if (actionObj.riverCard) {
            objectToCreate.riverCard = actionObj.riverCard;
        }
        return db().collection('deck').insert({...objectToCreate})
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
        let objectToUpdate = await db().collection('deck').find({_id: convertToObjectId(id)});
        if (actionObj.deckCards) {
            objectToCreate.deckCards = actionObj.deckCards;
        }
        if (actionObj.flopCard) {
            objectToCreate.flopCard = actionObj.flopCard;
        }
        if (actionObj.turnCard) {
            objectToCreate.turnCard = actionObj.turnCard;
        }
        if (actionObj.riverCard) {
            objectToCreate.riverCard = actionObj.riverCard;
        }
        return db().collection('deck').update({_id: convertToObjectId(id)}, { ...objectToUpdate})
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports.delete = async (id, res) => {
    try {
        if (!id) {
            throw 'Card Id Required'
        } else {
            return await db().collection('deck').deleteOne({_id: convertToObjectId(id)});
        }
    } catch (e) {
        res.status(413).send(e);
    }
}
const getDeckCards = async (deck) => {
    deck.deckCards = await Promise.all(deck.deckCards.map(async (objectId) => {
        const card = await db().collection('card').findOne({_id: objectId})
        return card;
    }));
    return deck;
}

const createDeck = async () => {
    const ranks = ['Ace', 'King', 'Queen', 'Jack', 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const cards = [];
    const { insertedId } = await db().collection('deck').insertOne({deckCards: [], isInUse: false});
    let index = 0;
    for (let i = 0; i < ranks.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            const card = await db().collection('card').insertOne({deckId: insertedId, index: index++, rank: ranks[i], suit: suits[j] });
            cards.push(card.insertedId);
        }
    }
    await db().collection('deck').updateOne({_id: insertedId}, { $set: {deckCards: cards }}, {upsert: true});
    const deck = await db().collection('deck').findOne({_id: insertedId});
    return await getDeckCards(deck);
}
module.exports.createDeck = async () => createDeck()

module.exports.getOrCreateDeck = async () => {
    const deck = await db().collection('deck').find({isInUse: false}).toArray();
    if (deck.length) {
        return await getDeckCards(deck[0]);
    } else {
        return createDeck();
    }
}