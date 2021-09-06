const { db } = require('../DataBaseTool');
module.exports.createCollection = () => db().createCollection("deck", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          properties: {
            deckCards: {
                type: "array",
                description: "array of up to 52 card ids in the deck"
            },
            isInUse: {
                bsonType: "bool",
                description: 'is Deck Being used'
            },
            userCards: {
                type: "array",
                description: "must be an array of objects with their userIds and cards"
            },
            flopCards: {
                type: "array",
                description: "an array of three card ids played in round state flop, not required"
            },
            turnCard: {
                bsonType: "objectId",
                description: 'card id for the card played in round state turn',
            },
            riverCard: {
                bsonType: "objectId",
                description: 'card id for the card played in round state: river',
            },
          }
       }
    }

 })

 