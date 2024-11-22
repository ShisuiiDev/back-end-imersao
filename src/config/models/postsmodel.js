import 'dotenv/config';
import { ObjectId } from "mongodb"
import conectarAoBanco from "../dbConfig.js"
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)       // Estabelece a conexão com o banco de dados usando a string de conexão do ambiente


export async function getTodosPosts() {       // Função assíncrona para buscar todos os posts do banco de dados
    const db = conexao.db("imersao-instabytes")     // Obtém o banco de dados 'imersao-instabytes'
    const colecao = db.collection("posts")      // Obtém a coleção 'posts'
    return colecao.find().toArray()     // Retorna todos os documentos da coleção como um array
}


export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes")     // Obtém o banco de dados 'imersao-instabytes'
    const colecao = db.collection("posts")      // Obtém a coleção 'posts'
    return colecao.insertOne(novoPost)    // Retorna todos os documentos da coleção como um array
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes")     // Obtém o banco de dados 'imersao-instabytes'
    const colecao = db.collection("posts")      // Obtém a coleção 'posts'
    const objectId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id:new ObjectId(objectId)}, {$set:novoPost})    // Retorna todos os documentos da coleção como um array
}