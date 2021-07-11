const passport = require('passport')
const DiscordPass = require('passport-discord')
const User = require('../database/schema/User')


passport.serializeUser( ( user, done ) => {
    done(null, user.discordId)
});

passport.deserializeUser( async ( discordId, done ) => {
    try {
        const user = await User.findOne({ discordId });
        return user ? done( null, user ) : done(null, null);
    } catch ( err ) {
        console.log(err);
        done( err, null );
    }
});

// Login
passport.use( new DiscordPass({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_CALLBACK_URL,
    scope: ["identify", "guilds"]
}, async (accessToken, refreshToken, profile, done) => {

    const { id, discriminator, username, avatar, guilds } = profile;
    console.log( id, discriminator, username, avatar, guilds )
    try {
        const findUser = await User.findOneAndUpdate({ discordId: id }, {
            discordTag: `${username}#${discriminator}`, 
            avatar,
            guilds

        }, { new: true });
        if( findUser ) { 
            console.log("⛔️ Fail: User was not found.");
            return done(null, findUser);
        } else {
            const newUser = await User.create({ 
                discordId: id,
                discordTag: `${username}#${discriminator}`, 
                avatar,
                guilds
             })
             return done( null, newUser )
        }
    } catch ( err ) {
        console.log(err)
        return done( err, null)
        }
    })
);