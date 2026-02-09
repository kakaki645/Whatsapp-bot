const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


    const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // ← CHANGE THIS TO true
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp bot is ready');
});

client.on('message', async message => {
  const text = message.body.toLowerCase();
  const chat = await message.getChat();

  // ===== BASIC REPLIES (DMs + GROUPS) =====
  if (text === 'hi') {
    return message.reply('what do you want retard 🤡😡');
  }

  if (text === 'kakaki') {
    return message.reply('He is chilling with felicia');
  }

  if (text === 'gm') {
    return message.reply('Gm, you good?');
  }

  if (text === 'capone') {
    return message.reply('Digitrabbit to 0.2E');
  }

  if (text === 'my love') {
    return message.reply('Oh no, nobody loves me, I will go peller 😭');
  }

  if (
    text.includes('send') &&
    (text.includes('usdt') || text.includes('usdt') || text.includes('usdt'))
  ) {
    return message.reply("I am broke, I can't help you 😩");
  }

  if (text === 'what are we grinding') {
    return message.reply('Go make research and update us modafker 😒');
  }

  // ===== COMMANDS =====
  if (text === '!ping') {
    return message.reply('pong 🏓 bot active');
  }

  if (text === '!help') {
    return message.reply(
`🤖 *Bot Commands*

hi → rude reply
kakaki → status reply
gm → greeting

capone
my love
what are we grinding
send + usdt

!ping
!tagall
!help`
    );
  }

  if (text === '!tagall') {
    if (!chat.isGroup) {
      return message.reply('This command works only in groups.');
    }

    const participants = chat.participants;
    let mentions = [];
    let text = '';

    for (let participant of participants) {
      mentions.push(participant.id._serialized);
      text += `@${participant.id.user} `;
    }

    return chat.sendMessage(text, { mentions });
  }
});

client.initialize();