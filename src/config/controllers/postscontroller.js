import {getTodosPosts, criarPost, atualizarPost}from "../models/postsmodel.js";
import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiservice.js"


export async function listarPosts (req, res) {     // Rota para buscar todos os posts
    const posts = await getTodosPosts()    // Chama a função para buscar os posts
    res.status(200).json(posts);        // Envia os posts como resposta em formato JSON com status 200 (sucesso)
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost)
        res.status(200).json(postCriado);
    }   catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisicao"})
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try{
        const postCriado = await criarPost(novoPost)
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);   
    }   catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisicao"})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    const post = {
        imgUrl: urlImagem,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post)
        
        res.status(200).json(postCriado);
    }   catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisicao"})
    }
}