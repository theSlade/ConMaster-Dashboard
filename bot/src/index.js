require("dotenv").config();
const { Collection, Client, Discord } = require('discord.js');
const mongoose = require('mongoose')
const client = new Client({
    disableMention: 'everyone'
});
const path = require('path')
const fs = require('fs')
const config = require('./config.json');
module.exports = client;
client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
}); 

// DB
const db = require('./database/database')
db.then(() => console.log('Connected to MongoDB.')).catch(err => console.log(err));

client.login(config.token);