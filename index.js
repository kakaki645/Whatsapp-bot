const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { alertUsers, admins } = require("./users");

const app = express();
app.use(bodyParser.json());

const botNumber = "2349114876088"; // your bot number

// Webhook endpoint
app.post("/webhook", (req, res) => {
  const message = req.body.message || "";
  const from = req.body.from || "0000000000"; // sender number

  // Only respond to commands starting with /
  if (message.startsWith("/")) {

    // /alert command (first 10 users) - Admin only
    if (message.startsWith("/alert")) {
      if (!admins.includes(from)) {
        console.log("Non-admin tried to alert");
        return res.sendStatus(200);
      }
      const content = message.replace("/alert", "").trim();
      const mentions = alertUsers.slice(0, 10);
      console.log("ALERT:");
      console.log(`${mentions.map(u => `@${u}`).join(" ")}\n${content}`);
    }

    // /tagall command (all users) - Admin only
    if (message.startsWith("/tagall")) {
      if (!admins.includes(from)) {
        console.log("Non-admin tried to tag all");
        return res.sendStatus(200);
      }
      const content = message.replace("/tagall", "").trim();
      console.log("TAGALL:");
      console.log(`${alertUsers.map(u => `@${u}`).join(" ")}\n${content}`);
    }

    // /help command
    if (message === "/help") {
      console.log("Commands:\n/alert <message>\n/tagall <message>\n/help\n/btc\n/eth");
    }

    // /btc command
    if (message === "/btc") {
      axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
        .then(response => console.log(`Bitcoin price: $${response.data.bitcoin.usd}`))
        .catch(err => console.log("Error fetching BTC price:", err));
    }

    // /eth command
    if (message === "/eth") {
      axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        .then(response => console.log(`Ethereum price: $${response.data.ethereum.usd}`))
        .catch(err => console.log("Error fetching ETH price:", err));
    }
  }

  // --- Robust Auto-reply ---
  if (from !== botNumber) { // prevent bot replying to itself
    if (message.includes(botNumber) || message.toLowerCase().includes("bot")) {
      console.log(`Auto-reply to ${from}: "I saw your message! I will respond soon."`);
    }
  }

  res.sendStatus(200);
});

// Home route
app.get("/", (req, res) => {
  res.send("Bot simulator running");
});

// Start server
app.listen(3000, () => console.log("Bot simulator running on port 3000"));