const client = require('../index.js')
const GuildConfig = require('../schema/GuildConfig')
/* Emitted whenever the client joins a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The created guild    */
client.on("guildCreate", async (guild) => {
    try {
        const guildconfig = await GuildConfig.create({
            guildId: guild.id,
        })
        console.log("This server have been saved to the database!")
    } catch ( err ) {
        console.log(err)
    }
});