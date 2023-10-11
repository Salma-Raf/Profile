import { posts } from "../model/posts";
import axios from 'axios';
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
export class ServicePost {
  PostDB = new PostDB();
  constructor(repoclient: PostDB) {
    this.PostDB = repoclient;
  }

  async save(req: any, res: any) {
    const user2 = axios.get(process.env.API_URL+'/client/'+)
    .then(function (response) {
      console.log('Réponse du microservice :', response.data);
    })
    .catch(function (error) {
      console.error('Erreur lors de l\'appel au microservice :', error);
    });
      req.body.receiver_id
    )) as any;
    const user1 = (await this.trepoclient.getUserById(
      req.body.sender_id
    )) as User;
    if (user1 != null && user2 != null) {
      await this.PostDB
        .createPost(req.body as Post)
        .then((e) => {
          return res.status(200).send(e);
        })
        .catch((err) => console.log("Error in create Post", err));
    } else {
      return res.status(500).send("users not found");
    }
  }

  async delete_fo_all(req: any, res: any) {
    const Post_id = req.params.id;
    if (Post_id != null) {
      this.PostDB
        .deletePostAll(Post_id)
        .then((e) => {
          return res.status(204).send(e);
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(500).send("Post not found");
    }
  }
  async transfer_msg(req: any, res: any) {
    const { msg_id, usr_receiver } = req.body;
    const Post = await this.PostDB.getPostById(msg_id);
    const user2 = (await this.trepoclient.getUserById(usr_receiver)) as User;
    const user1 = (await this.trepoclient.getUserById(
      Post.sender_id
    )) as User;
    console.log(user1, user2, Post);
    if (!user1 || !user2 || !Post) {
      return res.status(500).send("users or Post not found.");
    } else {
      await this.PostDB
        .transferPost(Post, usr_receiver)
        .then((e) => {
          return res.status(200).send(e);
        })
        .catch((err) => console.log(err));
    }
  }
  async suppparmoi(req: any, res: any) {
    const Post_id = req.params.id;
    if (Post_id != null) {
      this.PostDB
        .deletePostmoi(Post_id)
        .then((e) => {
          return res.status(204).send(e);
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(500).send("Post not found");
    }
  }
  async updatemssage(req: any, res: any) {
    try {
      const msg: Post = req.body as Post;
      const user1 = await this.trepoclient.getUserById(msg.sender_id);
      const user2 = await this.trepoclient.getUserById(msg.sender_id);

      if (!user1 || !user2) {
        return req.status(500).send("usersnotfound");
      }
      const mes = await this.PostDB.getPostById(req.params.id);

      if (!mes) return res.status(500).send("msg not found");
      console.log(mes);
      const result = await this.PostDB.updatePost(req.params.id, msg);

      console.log(result);
      if (result) {
        return res.status.send(result);
      } else {
        throw new Error("impossible");
      }
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  async getmsgby2user(req: any, res: any) {
    try {
      const { sender_id, receiver_id } = req.query;
      const user1 = await this.trepoclient.getUserById(sender_id);
      const user2 = await this.trepoclient.getUserById(receiver_id);
      if (!user1 || !user2) {
        return res.status(404).send("Users not found");
      }

      const data = await this.PostDB.getAmisBy2user(sender_id, receiver_id);
      return res.status(200).json(data);
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).send("Internal Server Error");
    }
  }
}
