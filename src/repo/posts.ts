import { posts } from "../model/posts";
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
    VALUES ($[url_img], NOW(), $[content], $[id_user], 0)
    RETURNING *
    `;

    post = await db.one(insertQuery, post);
    return post;
  }

  async GetAllpost(id_user: number) {
    const insertQuery = `
    select * from posts where id_user=$1 AND date_sup is null  order by id desc
   `;

    const date = await db.query(insertQuery, id_user);
    return date;
  }
  // Fonction pour récupérer un Post par son ID
  async getPostById(id: number) {
    const selectQuery = `
    SELECT * FROM posts
    WHERE id = $[id] AND date_sup is null
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

  async reactPost1(id_user: number, id_post: number) {
    const react = 'INSERT INTO "likes" (id_post, id_user) VALUES($1, $2)';
    await db.none(react, [id_post, id_user]);
  }

  async reactPost2(id_post: number) {
    const updateQuery = `
    UPDATE posts
    SET nbr_like=nbr_like+1
    WHERE id = $[id_post] AND date_sup is null 
  `;
    const result = await db.result(
      updateQuery,
      { id_post },
      (r: { rowCount: any }) => r.rowCount
    );
    return result === 1;
  }

  async getlike(id_user: number, id_post: number) {
    console.log(id_post);
    const insertQuery = `
    select * from likes where id_user=$1 AND id_post=$2`;

    const date = await db.query(insertQuery, [id_user, id_post]);
    console.log(date);
    return date[0];
  }
}
