const { db } = require('../DataBaseTool');
module.exports.createCollection = () =>db().createCollection("game", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          properties: {
            actions: {
                type: "array",
                description: "array of many action ids in sequential order"
            },
            pot: {
                bsonType: "double",
                description: "Total amount currently in the pot",
            },
            currentConnectedUsers: {
                type: "array",
                description: "users currently connected and playing game, isrequired"
            },
            gameState: {
                enum: [ "notStarted", "onGoing", "completed" ],
                description: "can only be one of the enum values and is required"
            },
            users: {
                type: "array",
                description: "users that have connected"
            },
            deckId: {
                bsonType: 'objectId',
                description: 'deck id used for this game',
            },
            rounds: {
                type: "array",
                description: 'array of round ids in sequential order',
            },
          }
       }
    }
 })
 