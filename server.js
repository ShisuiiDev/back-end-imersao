import express from "express";    // Importa o framework Express para criar a aplicação web
import routes from "./src/config/routes/postroutes.js";

// **Observação:** A partir daqui, os dados dos posts deveriam ser buscados do banco de dados, não armazenados em um array.

// Array de posts (este array seria removido em uma aplicação real)


const app = express();      // Cria uma instância do aplicativo Express
app.use(express.static("uploads"))

routes(app)

app.listen(3000, () => {    // Inicia o servidor na porta 3000 e exibe uma mensagem no console
    console.log("servidor escutando...");       
}); 













