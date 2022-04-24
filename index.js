const prompt = require('prompt-sync')({sigint: true});
const c = require('chalk');
console.log('Options:\n1=> for Spotify Presence\n2=> for Game Presence\n3=> for Twitch Presence');

const config = require("./config.json")
const acess = require("./token.json")
const keepAlive = require("./server")
let discord = require('discord.js-selfbot-v11')
let rpcGenerator = require("discordrpcgenerator")
const TOKEN = (acess.TOKEN);
var uuid = ()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16))
let client = new discord.Client()

var num = Number(prompt('Enter a number: '));
while(!(num==1||num==2||num==3))

keepAlive()
client.login(TOKEN)

 if(num==1){
spotify();
}
if(num==2){
game();
}
if(num==3){
twitch();
}
function game(){
client.on("ready", () => {
    rpcGenerator.getRpcImage(config.settings.game.appID, config.settings.game.largeimage).then(image => {
        let presence = new rpcGenerator.Rpc()
        .setType("PLAYING")
        .setName(config.settings.game.name)
        .setDetails(config.settings.game.details)
        .setState(config.settings.game.state)
        .setAssetsLargeImage(config.settings.game.largeimage.id || image.id)
        .setAssetsLargeText(config.settings.game.largetext)
        .setAssetsSmallImage(config.settings.game.smallimage)
        .setAssetsSmallText(config.settings.game.smalltext)
        .setStartTimestamp(Date.now())
        .setApplicationId(config.settings.game.appID)
 
        client.user.setPresence(presence.toDiscord())
        
                    // Set the status
            if (config.status === 'online' || config.status === 'idle' || config.status === 'dnd') {
                client.user.setStatus(config.status);
            }

            if (config.status === 'offline' || config.status === 'invisible') {
                console.log('Status cant be set to' + config.status + '\nPlease change the status in the config.json file');
            }
            console.log(c.hex('#FF00FF')'RPC discord connected! in user:' + client.user.name)
            console.log(c.hex('#800080')('successfully RPC "PLAYING" active!'));
            console.log(c.hex('#800080')('Playing: ' + config.settings.game.name));
            console.log(c.hex('#800080')('Status: ' + config.status));
    });
})
}

function twitch(){
    client.on('ready', () => {
        try {
            rpcGenerator.getRpcImage(config.settings.twitch.appID, config.settings.twitch.largeimage).then(image => {
              let presence = new rpcGenerator.Rpc()
                    .setName(config.settings.twitch.name)
                    .setType("STREAMING")
                    .setUrl(config.settings.twitch.url)
                    .setApplicationId(config.settings.twitch.appID)
                    .setState(config.settings.twitch.state)
                    .setDetails(config.settings.twitch.details)
                    .setAssetsLargeImage(config.settings.twitch.largeimage.id || image.id)
                    .setAssetsLargeText(config.settings.twitch.largetext)
                    .setAssetsSmallImage(config.settings.twitch.smallimage)
                    .setAssetsSmallText(config.settings.twitch.smalltext)


                client.user.setPresence(presence.toDiscord());
            });
            
            console.log(c.hex('#FF00FF')'RPC discord connected! in user:' + client.user.name)
            console.log(c.hex('#800080')('Twitch RPC enabled successfully!'));
            console.log(c.hex('#800080')('Twitch: ' + config.settings.twitch.name));
            console.log(c.hex('#800080')('Status: ' + 'streaming icon'));

        } catch (err) {
            console.error(err);
        }
    });
}

function spotify(){
    client.on('ready', () => {
        try {
            rpcGenerator.getRpcImage(config.settings.spotify.appID, config.settings.spotify.largeimage).then(image => {
              let presence = rpcGenerator.createSpotifyRpc(client)
                    .setName(config.settings.spotify.name)
                    .setType(config.settings.spotify.type)
                    .setUrl(config.settings.twitch.url)
                    .setApplicationId(config.settings.spotify.appID)
                    .setDetails(config.settings.spotify.details)
                    .setState(config.settings.spotify.state)
                    .setAssetsLargeImage(config.settings.spotify.largeimage.id || image.id)
                    .setAssetsLargeText(config.settings.spotify.largetext)
                    .setAssetsSmallImage(config.settings.spotify.smallimage)

                client.user.setPresence(presence.toDiscord());
            });
            
            console.log(c.hex('#FF00FF')'RPC discord connected! in user:' + client.user.name)
            console.log(c.hex('#800080')('successfully RPC "SPOTIFY" active!'));
            console.log(c.hex('#800080')('spotify: ' + config.settings.spotify.name));
            console.log(c.hex('#800080')('Status: ' + config.status));


        } catch (err) {
            console.error(err);
        }
    });
}


//                  E N D 

