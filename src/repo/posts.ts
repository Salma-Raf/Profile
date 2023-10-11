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
  async createPost(post: posts) {
    const insertQuery = `
    INSERT INTO posts (url_img, date_pub, content, id_user, nbr_like)
    VALUES ($[url_img], NOW(), $[content], $[id_user], 0);
    RETURNING *
    `;
    post = await db.one(insertQuery, post);
    console.log(post);
    return post;
  }

  async GetAllpost(id_user: number) {
    const insertQuery = `
    select * from posts where id_user=$1 order by id desc
   `;

    const date = await db.query(insertQuery, id_user);
    return date;
  }
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
