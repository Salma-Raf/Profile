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

  async reactPost(req: any, res: any) {
    const post_id = req.params.id;
    this.postDB
      .reactPost(post_id)
      .then((e) => {
        if (e) return res.status(204).send(e);
        return res.status(500).send(e);
      })
      .catch((err) => console.log(err));
  }
}
