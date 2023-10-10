import { posts } from "../model/posts";
import { generateUpdaters } from '../utils/setting';
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
  async createPost(id_user: number) {
  
  }

  async GetAllpost(id_user: number) {
   
  }
  // Fonction pour récupérer un Post par son ID
  async getPostById(id: number) {
   
  }

  // Fonction pour mettre à jour un Post par son ID


  // Fonction pour supprimer un Post par son ID
  async deletePost(id: number) {
    
  }
  
  async reactPost(id: number) {
   
  }
}
