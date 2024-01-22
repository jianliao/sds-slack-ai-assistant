import pkg from '@slack/bolt';
import 'dotenv/config';

const { App, LogLevel } = pkg;

const clientOptions = {
  // enable this for dev instance
  // slackApiUrl: 'https://dev.slack.com/api/'
};

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  clientOptions,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: LogLevel.DEBUG,
});

(async () => {
  // Start your app
  // await app.start(process.env.PORT || 3000);
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();

app.event('app_mention', async ({ event, say }) => {
  await say(`Hi there, <@${event.user}>! What's up?`);
});

app.event('message', async ({ event, client }) => {
  console.log('Event Type: ', event.channel_type);
  console.log('Message.channels: ', event);
  try {
    // Call chat.postMessage with the built-in client
    await client.chat.postMessage({
      channel: event.channel,
      text: `Hello world!`,
      thread_ts: event.ts,
    });
  } catch (error) {
    console.error(error);
  }
});

app.command('/rag', async ({ command, ack, say }) => {
  await ack();
  await say(`Hello, <@${command.user_id}>! This is a RAG response!`);
});
