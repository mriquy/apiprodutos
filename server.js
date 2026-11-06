require('dotenv').config();
const express = require('express');
const fs = require('fs');

const path = require('path');
// path = caminho
const app = express();

//1.define o caminho do arquivo produto.json
const arquivoProdutos = path.join(__dirname, 'database', 'produtos.json');



app.use(express.json()); 


app.post('/produtos', (req, res) =>{
    const { codigo, nome, qtde, preco} = req.body;

    //2. transformar e calcular os dados
    const novoProduto ={
        codigo,
        nome: String(nome).toUpperCase(),
        quantidade: Number(qtde),
        preco: Number(preco),
        total: Number(qtde) * Number(preco)
    }
    //3. ler o arquivo produtos.json
    const conteudoTexto = fs.readFileSync(arquivoProdutos, 'utf-8');
    console.log(conteudoTexto);
    const listaProdutos = JSON.parse(conteudoTexto); // converte texto em array JS array = lista

    //4.adicionar o novo produto na lista
    listaProdutos.push(novoProduto);
    //5.salvar
    fs.writeFileSync(arquivoProdutos, JSON.stringify(listaProdutos, null, 2))
    return res.json({
        mensagem:"produto recebido com sucesso!",
        dadosOriginais: { codigo, nome, qtde, preco}
    })
})


const PORT = process.env.PORT;
app.listen(PORT, () =>{ 
    console.log(`servidor rodando na porta ${PORT}`)
})