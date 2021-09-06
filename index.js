const http = require('http');
const hostname = '127.0.0.1';
const express = require('express');
const actionApi = require('./Action/Action.Routes');
const authApi = require('./User/User.Routes');
const cardApi = require('./Card/Card.Routes');
const deckApi = require('./Deck/Deck.Routes');
const gameApi = require('./Game/Game.Routes');
const roundApi = require('./Round/Round.Routes');
const dbTool = require('./DataBaseTool');
const app = new express();
const port = 3000;
require('dotenv').config();

// dbTool.init();
async function initDB() {
    await dbTool.init();
    // await dbTool.createCollections();
}
initDB();
app.use(express.json())
// app.use(validateAuthToken);
app.use('/action', actionApi);
app.use('/card', cardApi );
app.use('/deck', deckApi);
app.use('/game', gameApi);
app.use('/round', roundApi);
app.use('/auth', authApi);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
