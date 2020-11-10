const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json') //llamamos al archivo de configuracion

//funcion para el estado del bot
function estadoDelBot(){
    client.user.setPresence ({
        status: 'online',
        activity: {
            name: 'al mercado | -ayuda',
            type: 'WATCHING'
        }
    })
}

let prefix = config.PREFIX; //Llamamos al Prefix


client.on('ready', () => {
    console.log('Estoy Listo!!');
    estadoDelBot(); //Llamamos la funcion de estado
});


client.on('message', (message) => {

if(message.author.bot) return; //No responder a mensajes de otros Bots
if(!message.content.startsWith(prefix)) return; //No responder si el contenido del mensaje no empieza por el prefix

//Definimos prefix y commands
const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLocaleLowerCase();

if( command === 'ayuda'){
    message.channel.send('Lo siento, Este bot aun esta en fase de pruebas!! :pensive: ');
}

//Expulsar a un usuario
if(command === 'kick'){
    let mencionado = message.mentions.users.first();
    let razon = args.slice(1).join(' ');

    if(!mencionado) return message.channel.send('Mencione a un usuario');
    if(!razon) return message.channel.send('Debe escribir una razon para expulsar al usuario\n\n**Ejemplo:** -kick @usuariomencionado El usuario ha roto las reglas del servidor');

    message.guild.member(mencionado).kick(razon);
    message.channel.send(`El usuario :point_right_tone3: **${mencionado.tag}** fue expulsado del servidor.\n\n**Razón: **${razon}`)
}

//Banear a un usuario
if(command === 'ban'){
    let mencionado = message.mentions.users.first();
    let razon = args.slice(1).join(' ');

    if(!mencionado) return message.channel.send('Mencione a un usuario');
    if(!razon) return message.channel.send('Debe escribir una razon para banear al usuario.\n\n**Ejemplo:** -ban @usuariomencionado El usuario ha roto las reglas del servidor');

    message.guild.member(mencionado).ban(razon);
    message.channel.send(`El usuario :point_right_tone3: **${mencionado.tag}** fue baneado del servidor.\n\n**Razón: **${razon}`)
}



});



client.login(config.TOKEN); //Llamamos al TOKEN