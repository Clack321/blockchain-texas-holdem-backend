
let mongo;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
module.exports.init = async () => {
    console.log("Attempting to connect to the Mongo Database...");
    try {
        mongo = await MongoClient.connect(`mongodb://${process.env.db_url}`);
        // console.log(`Successfully connected to MongoDB (${(await(await mongo.db('texas_holdem').admin()).serverInfo()).version}) on $x{MONGO.DATABASE} at ${MONGO.URL}`);
    } catch (error) {
        console.error(`Failed to connect to "mongodb://${process.env.db_url}"`)
        console.log(error);
    }
}

module.exports.connect = () => {
    return mongo;
}

module.exports.db = () => {
    return mongo.db('texas_holdem')
}

module.exports.covertToObjectId = (id) => {
    return ObjectId(id.toString())
}

module.exports.createCollections = async () => {
    const Action = require('./Action/Action.Model');
    const Card = require('./Card/Card.Model');
    const Deck = require('./Deck/Deck.Model');
    const Game = require('./Game/Game.Model');
    const Round = require('./Round/Round.Model');
    const User = require('./User/User.Model');
    
    await Action.createCollection();
    await Card.createCollection();
    await Deck.createCollection();
    await Game.createCollection();
    await Round.createCollection();

    await User.createCollection();
}