const { db } = require('../DataBaseTool');
module.exports.createCollection = () => db().createCollection("action", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "userId", "roundId" ],
          properties: {
             userId: {
                bsonType: "objectId",
                description: "users object id"
             },
            amount: {
                bsonType: "double",
                description: "amount is a double and not required"
             },
             roundId: {
                bsonType: "objectId",
                description: "must be a string and is required"
             },
             type: {
                enum: ['call', 'fold', 'blind', 'raise', 'join'],
                description: "can only be one of the enum values and is required"
             },
          }
       }
    }
 })
 