import { posts } from "../model/posts";
import { generateUpdaters } from "../utils/setting";
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

export class PostDB {
  // Fonction pour insérer un Post
  async createPost(id_user: number) {}

  async GetAllpost(id_user: number) {}
  // Fonction pour récupérer un Post par son ID
  async getPostById(id: number) {
    const selectQuery = `
    SELECT * FROM posts
    WHERE id = $[id] AND deleted is null
    `;

    const post = await db.oneOrNone(selectQuery, { id });

    return post;
  }

  // Fonction pour mettre à jour un Post par son ID

  // Fonction pour supprimer un Post par son ID
  async deletePost(id: number) {
    const updateQuery = `
    UPDATE posts
    SET date_sup= NOW()
    WHERE id = $[id]
  `;

    const result = await db.result(
      updateQuery,
      { id },
      (r: { rowCount: any }) => r.rowCount
    );
    return result === 1;
  }

  async reactPost(id: number) {
    const updateQuery = `
    UPDATE posts
    SET nbr_like=nbr_like+1
    WHERE id = $[id]
  `;
    const result = await db.result(
      updateQuery,
      { id },
      (r: { rowCount: any }) => r.rowCount
    );
    return result === 1;
  }
}
