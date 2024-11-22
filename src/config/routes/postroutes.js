import express from "express"; // Importa o framework Express para criar a API
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postscontroller.js"; // Importa as funções dos controladores que manipulam os posts

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento das imagens usando o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para as imagens.
    // **Observação:** Substitua 'uploads/' pelo caminho desejado no seu projeto.
    // Recomenda-se utilizar um caminho relativo à pasta do projeto para maior portabilidade.
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo.
    // **Observação:** Para evitar conflitos de nomes, considere gerar nomes únicos
    // utilizando bibliotecas como 'uuid' ou 'crypto'.
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com as configurações definidas
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
app.use(cors(corsOptions))

  // Rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  // upload.single("imagem"): Configura o Multer para lidar com um único arquivo
  // com o nome "imagem" no formulário.
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
}

export default routes; // Exporta as rotas para serem utilizadas em outro módulo