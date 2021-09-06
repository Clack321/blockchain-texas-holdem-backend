const { db } = require('../DataBaseTool');
module.exports.createCollection = () => db().createCollection("user", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          properties: {
             username: {
                type: "string",
                description: "must be a string and is required"
             },
             password: {
                type: "string",
                description: "must be a string and is required"
             },
             email: {
                type: "string",
                description: "must be a string and is required"
             },
             amount: {
                bsonType: "double",
                minimum: 0,
                description: "must be a double and is required"
             },
             currency: {
                enum: [ "usd", "eth", "btc", "eur", null ],
                description: "can only be one of the enum values and is required"
             },
             role: {
                enum: [ "admin", "user" ],
                description: "can only be one of the enum values and is required"
             },
          }
       }
    }
 })
