const { db } = require('../DataBaseTool');
module.exports.createCollection = () =>db().createCollection("round", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          properties: {
            currentBlind: {
                bsonType: "double",
                description: "Blind (amount) that the user has to pay",
            },
            currentUserTurn: {
                bsonType: "objectId",
                description: "object Id of user that's turn it is",
            },
            pot: {
                bsonType: "double",
                description: "Total amount currently in the pot for this round",
            },
            flopCards: {
                type: "array",
                description: "3 cards played on the flop"
            },
            turnCard: {
                bsonType: "objectId",
                description: "id of card played on turn"
            },
            riverCard: {
                bsonType: "objectId",
                description: "id of card played on river"
            },
            phase: {
                enum: ["initial", "deal", "flop", "turn", "river"],
                description: "can only be one of the enum values and is required"
            },
            deckId: {
                bsonType: 'objectId',
                description: 'deck id used for this game',
            },
            actions: {
                type: "array",
                description: 'array of round ids in sequential order',
            },
          }
       }
    }
 })
 
