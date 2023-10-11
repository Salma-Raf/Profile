import axios from "axios";
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
export class ServicePost {
  postDB = new PostDB();
  constructor(repoclient: PostDB) {
    this.postDB = repoclient;
  }

  async createPost(req: any, res: any) {
    const user_id = req.body.id_user;

    const user1 = await axios.get(process.env.API_URL + "/client/" + user_id);
    if (user1 != null) {
      await this.postDB
        .createPost(req.body as posts)
        .then((e) => {
          return res.status(200).send(e);
        })
        .catch((err) => console.log("Error in create post", err));
    } else {
      return res.status(500).send("users not found");
    }
  }

  async GetAllpost(req: any, res: any) {
    await this.postDB
      .GetAllpost(req.params.id_user)
      .then((e) => {
        return res.status(200).send(e);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }
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

  async reactPost(req: any, res: any) {
    if (req.params.id != null) {
      const post = await this.postDB.getPostById(req.params.id);
      if (post != null) {
        this.postDB
          .reactPost(post.id)
          .then((e) => {
            return res.status(204).send(e);
          })
          .catch((err) => console.log(err));
      } else {
        return res.status(500).send("post not found");
      }
    } else {
      return res.status(500).send("id not found");
    }
  }
}
