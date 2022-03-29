import { Message, Client, Intents } from 'discord.js';
import 'dotenv/config';
import { Telegraf } from 'telegraf';
import logger from './utils/logger';

if (process.env.TELEGRAM_BOT_TOKEN === undefined) {
 throw new TypeError('BOT_TOKEN must be provided!');
} else if (!process.env.TELEGRAM_CHANNEL_ID) {
 throw new TypeError('TELEGRAM_CHANNEL_ID must be provided!');
}
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);

const client = new Client({
 intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.login(process.env.DISCORD_BOT_TOKEN as string);

const sendTGMessage = async (msg: string) => {
 bot.telegram.sendMessage(
    process.env.TELEGRAM_CHANNEL_ID as string,
    msg,
 );
};

client.on('messageCreate', async (message: Message) => {
 try {
  if (
   message.content.includes(process.env.PATTERN as string)
     && message.channelId === process.env.DISCORD_CHANNEL_ID
  ) {
   await sendTGMessage(message.content);
  }
 } catch (err) {
  logger.error(err);
 }
});
