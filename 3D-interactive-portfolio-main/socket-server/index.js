const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Portfolio Socket Server is running!");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store connected users: socketId -> User data
const users = new Map();
// Store last 50 messages
const messageHistory = [];

const colors = [
  "#60a5fa",
  "#f87171",
  "#4ade80",
  "#facc15",
  "#c084fc",
  "#fb923c",
  "#f43f5e",
  "#818cf8",
  "#22d3ee",
  "#a3e635",
];

io.on("connection", (socket) => {
  const username = socket.handshake.query.username || "Anonymous Explorer";
  const userColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Basic location lookup mock - defaults to Earth 🌐
  // If deployed on Render/Railway, can lookup headers for region
  let country = "Earth";
  let flag = "🌐";
  
  const cloudflareCountry = socket.handshake.headers["cf-ipcountry"];
  if (cloudflareCountry) {
    country = cloudflareCountry;
    flag = getFlagEmoji(cloudflareCountry);
  }

  const newUser = {
    socketId: socket.id,
    name: username,
    color: userColor,
    pos: { x: 0, y: 0 },
    location: country,
    flag: flag,
  };

  users.set(socket.id, newUser);
  console.log(`User connected: ${username} (${socket.id}) from ${country}`);

  // 1. Send initial messages history to the client
  socket.emit("msgs-receive-init", messageHistory);

  // 2. Broadcast updated user list to all clients
  io.emit("users-updated", Array.from(users.values()));

  // 3. Handle cursor position changes
  socket.on("cursor-change", (data) => {
    const user = users.get(socket.id);
    if (user) {
      user.pos = data.pos;
      // Broadcast cursor changed to everyone else
      socket.broadcast.emit("cursor-changed", {
        socketId: socket.id,
        pos: data.pos,
        name: user.name,
        color: user.color,
        location: user.location,
        flag: user.flag,
      });
    }
  });

  // 4. Handle chat messages
  socket.on("msg-send", (data) => {
    const user = users.get(socket.id);
    if (user && data.content) {
      const newMessage = {
        socketId: socket.id,
        content: data.content,
        username: user.name,
        time: new Date(),
      };
      
      messageHistory.push(newMessage);
      if (messageHistory.length > 50) {
        messageHistory.shift();
      }

      io.emit("msg-receive", newMessage);
    }
  });

  // 5. Handle username changes
  socket.on("username-change", (data) => {
    const user = users.get(socket.id);
    if (user && data.username) {
      console.log(`User changed name: ${user.name} -> ${data.username}`);
      user.name = data.username;
      io.emit("users-updated", Array.from(users.values()));
    }
  });

  // 6. Handle disconnection
  socket.on("disconnect", () => {
    const user = users.get(socket.id);
    if (user) {
      console.log(`User disconnected: ${user.name} (${socket.id})`);
      users.delete(socket.id);
      io.emit("users-updated", Array.from(users.values()));
    }
  });
});

// Helper function to turn ISO country code into Flag Emoji
function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket server is listening on port ${PORT}`);
});
