const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app =express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req, res)=>{
    const sql = "Select * from livros";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Erro");
        return res.json(data);
    })
})

app.get("/detalhes/:id", (req, res) => {
    const sql = "SELECT * FROM livros WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json("Erro");
        if (data.length === 0) return res.status(404).json("Livro não encontrado");
        return res.json(data[0]);
    });
});

app.post('/create', (req, res) =>{
    const sql = "INSERT INTO livros (`titulo`,`autor`,`descricao`,`preco`) VALUES (?)";
    const values = [
        req.body.titulo,
        req.body.autor,
        req.body.descricao,
        req.body.preco
    ]
    db.query(sql,[values],(err, data) =>{
        if(err) return res.json("ERRO");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) =>{
    const sql = "Update livros set `titulo`=?, `autor`=?, `descricao`=?, `preco`=? where id = ?";
    const values = [
        req.body.titulo,
        req.body.autor,
        req.body.descricao,
        req.body.preco
    ]
    const id = req.params.id;
    db.query(sql,[...values, id],(err, data) =>{
        if(err) return res.json("ERRO");
        return res.json(data);
    })
})

app.delete('/delete/:id', (req, res) =>{
    const sql = "Delete from livros where id = ?";
    const id = req.params.id;
    db.query(sql,id,(err, data) =>{
        if(err) return res.json("ERRO");
        return res.json(data);
    })
})

app.put('/alugar/:id', (req, res) => {
    const sql = "UPDATE livros SET `stock` = stock - ? WHERE id = ?";
    const id = req.params.id; 
    const values = [1, id]; 

    db.query(sql, values, (err, data) => {
        if (err) return res.json("ERRO");
        return res.json(data);
    });
});

app.put('/comprar/:id', (req, res) => {
    const sql = "UPDATE livros SET `stock`=`stock`-? WHERE id = ?";
    const id = req.params.id; 
    const values = [1, id]; 

    db.query(sql, values, (err, data) => {
        if (err) return res.json("ERRO");
        return res.json(data);
    });
});

app.listen(8081,()=>{
    console.log("Ouvindo");
})