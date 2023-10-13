// Importer la bibliothèque Express avec la syntaxe ES modules
import express from "express";
import cors from "cors";
const profile = require("./src/rote/posts.ts");
import { Server as SocketServer } from "socket.io";
const host ="10.0.0.139"
// require('./globals'); // Importez le fichier globals.js pour initialiser la variable globale

// const cors = require("cors");

// Créer une instance d'application Express
const app = express();
const corsOptions = {
  origin: `http://localhost:4200`, // Remplacez par l'origine de votre application Angular
};

app.use(cors());
app.use(express.json());

app.use("/api/profile", profile);

// Définir une route pour la page d'accueil
app.get("/", (req: any, res: any) => {
  res.send("Hello, World!");
});

// Définir le port sur lequel le serveur écoutera
const port = 3001;

// Démarrer le serveur
const server = app.listen(port,host, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

const io = new SocketServer(server, {
  cors: {
    origin: `http://localhost:4200`,
    credentials: true,
  },
});

// // Assignez une valeur à la variable globale
// global.globalMap = new Map<string, string>();
// // Déclaration en tant que variable globale
//   io.on("connection", (socket) => {
//     // console.log(socket.id)
// socket.on("setup",(id)=>{
//   socket.join(id);
//   console.log(id);
//   socket.emit("connected",4);
// })
// socket.on("join chat",(id)=>{
//   socket.join(id);
//   console.log(id);
//   socket.emit("connected",4);
// })

// socket.on("join chat",(id)=>{
//   socket.join(id);
//   console.log(id);
//   socket.emit("connected",4);
// })
// socket.on("message",(message)=>{

//   socket.to(message.id).emit("msgenvoyer",message.message);
// })
// });

const onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log(22);

  socket.on("join chat", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers);
  });
  socket.on("message", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiver_id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msgenvoyer", data);
    }
  });
});
