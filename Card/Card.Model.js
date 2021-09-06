const { db } = require('../DataBaseTool');
module.exports.createCollection = () => db().createCollection("card", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          properties: {
            deckId: {bsonType: "objectId"},
            index: {
                bsonType: "int",
                minimum: 0,
                maximum: 51,
                description: "must be an integer and is required"
            },
            rank: {
                enum: ['Ace', 'King', 'Queen', 'Jack', 10, 9, 8, 7, 6, 5, 4, 3, 2],
                description: "can only be one of the enum values and is required"
            },
            suit: {
                enum: ['Hearts', 'Spades', 'Clubs', 'Diamonds'],
                description: 'card suit must be enum values and is required',
            },
          }
       }
    }
 })
 