const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const TOKEN = process.env.DISCORD_BOT_TOKEN || '';
const FIVEM_ENDPOINT = process.env.FIVEM_ENDPOINT || 'http://127.0.0.1:30120';
const UPDATE_INTERVAL_MS = Number(process.env.BOT_UPDATE_INTERVAL_MS || 15000);
const BOT_ACTIVITY_MODE = process.env.BOT_ACTIVITY_MODE || 'WATCHING';

if (!TOKEN) {
  console.error('[qb-discord-status-bot] Brak DISCORD_BOT_TOKEN w env.');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

function getActivityType(mode) {
  switch ((mode || '').toUpperCase()) {
    case 'PLAYING':
      return ActivityType.Playing;
    case 'LISTENING':
      return ActivityType.Listening;
    case 'COMPETING':
      return ActivityType.Competing;
    case 'STREAMING':
      return ActivityType.Streaming;
    case 'WATCHING':
    default:
      return ActivityType.Watching;
  }
}

async function fetchServerStatus() {
  try {
    const playersRes = await fetch(`${FIVEM_ENDPOINT}/players.json`);
    if (!playersRes.ok) throw new Error(`players.json status ${playersRes.status}`);
    const players = await playersRes.json();

    const infoRes = await fetch(`${FIVEM_ENDPOINT}/info.json`);
    if (!infoRes.ok) throw new Error(`info.json status ${infoRes.status}`);
    const info = await infoRes.json();

    return {
      online: true,
      players: Array.isArray(players) ? players.length : 0,
      maxPlayers: info.vars?.sv_maxClients || info.vars?.sv_maxclients || '?'
    };
  } catch (error) {
    return {
      online: false,
      players: 0,
      maxPlayers: 0,
      error: error.message
    };
  }
}

async function updateBotPresence() {
  const status = await fetchServerStatus();

  if (status.online) {
    client.user.setPresence({
      status: 'online',
      activities: [{
        name: `ONLINE | ${status.players}/${status.maxPlayers} graczy`,
        type: getActivityType(BOT_ACTIVITY_MODE)
      }]
    });
    console.log(`[bot] ONLINE ${status.players}/${status.maxPlayers}`);
  } else {
    client.user.setPresence({
      status: 'dnd',
      activities: [{
        name: 'STOPPED | Serwer offline',
        type: getActivityType(BOT_ACTIVITY_MODE)
      }]
    });
    console.log(`[bot] OFFLINE (${status.error})`);
  }
}

client.once('ready', async () => {
  console.log(`[qb-discord-status-bot] Zalogowano jako ${client.user.tag}`);
  await updateBotPresence();
  setInterval(updateBotPresence, UPDATE_INTERVAL_MS);
});

client.login(TOKEN);
