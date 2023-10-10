import { posts } from "../model/posts";
import { PostDB } from "../repo/posts";
const pgp = require("pg-promise")();
require("dotenv").config();
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const db = pgp(dbConfig);
export class ServiceMessage {
  postDB = new PostDB();
  constructor(repoclient: PostDB) {
    this.postDB = repoclient;
  }

  async createPost(req: any, res: any) {}

  async GetAllpost(req: any, res: any) {}
  async getPostById(req: any, res: any) {
    const post_id = req.params.id;
    try {
      const data = await this.postDB.getPostById(post_id);
      if (data == null) {
        return res.status(500).send(" post not exist");
      }
      return res.status(200).json(data);
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).send("Internal Server Error");
    }
  }
  async deletePost(req: any, res: any) {
    const post_id = req.params.id;
    if (post_id != null) {
      this.postDB
        .deletePost(post_id)
        .then((e) => {
          return res.status(204).send(e);
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(500).send("post not found");
    }
  }

  async reactPost(req: any, res: any) {}

  async save(req: any, res: any) {
    // const user2 = (await this.trepoclient.getUserById(
    //   req.body.receiver_id
    // )) as User;
    // const user1 = (await this.trepoclient.getUserById(
    //   req.body.sender_id
    // )) as User;
    // if (user1 != null && user2 != null) {
    //   await this.messageDB
    //     .createMessage(req.body as message)
    //     .then((e) => {
    //       return res.status(200).send(e);
    //     })
    //     .catch((err) => console.log("Error in create Message", err));
    // } else {
    //   return res.status(500).send("users not found");
    // }
  }

  async transfer_m(req: any, res: any) {
    // const { msg_id, usr_receiver } = req.body;
    // const message = await this.messageDB.getMessageById(msg_id);
    // const user2 = (await this.trepoclient.getUserById(usr_receiver)) as User;
    // const user1 = (await this.trepoclient.getUserById(
    //   message.sender_id
    // )) as User;
    // console.log(user1, user2, message);
    // if (!user1 || !user2 || !message) {
    //   return res.status(500).send("users or message not found.");
    // } else {
    //   await this.messageDB
    //     .transferMessage(message, usr_receiver)
    //     .then((e) => {
    //       return res.status(200).send(e);
    //     })
    //     .catch((err) => console.log(err));
    // }
  }

  async updatemssage(req: any, res: any) {
    // try {
    //   const msg: message = req.body as message;
    //   const user1 = await this.trepoclient.getUserById(msg.sender_id);
    //   const user2 = await this.trepoclient.getUserById(msg.sender_id);
    //   if (!user1 || !user2) {
    //     return req.status(500).send("usersnotfound");
    //   }
    //   const mes = await this.messageDB.getMessageById(req.params.id);
    //   if (!mes) return res.status(500).send("msg not found");
    //   console.log(mes);
    //   const result = await this.messageDB.updateMessage(req.params.id, msg);
    //   console.log(result);
    //   if (result) {
    //     return res.status.send(result);
    //   } else {
    //     throw new Error("impossible");
    //   }
    // } catch (e) {
    //   return res.status(500).send(e);
    // }
  }
}
