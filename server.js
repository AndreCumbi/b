const express = require("express");
const cors = require("cors");
const supabase = require("./supabaseClient"); // Importando a configuração do Supabase

const app = express();
app.use(express.json());
app.use(cors());

// Rota para listar todos os livros
app.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("livros")
            .select("*");

        if (error) return res.status(500).json({ error: error.message });
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: "Erro ao buscar livros" });
    }
});

// Rota para buscar os detalhes de um livro por ID
app.get("/detalhes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("livros")
            .select("*")
            .eq("id", id)
            .single();

        if (error) return res.status(500).json({ error: error.message });
        if (!data) return res.status(404).json({ message: "Livro não encontrado" });

        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: "Erro ao buscar o livro" });
    }
});

// Rota para criar um novo livro
app.post("/create", async (req, res) => {
    const { titulo, autor, descricao, preco, stock } = req.body;
    try {
        const { data, error } = await supabase
            .from("livros")
            .insert([
                { titulo, autor, descricao, preco, stock }
            ]);

        if (error) return res.status(500).json({ error: error.message });
        return res.status(201).json(data);
    } catch (err) {
        return res.status(500).json({ error: "Erro ao criar livro" });
    }
});

// Rota para atualizar um livro existente
app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, descricao, preco, stock } = req.body;
    try {
        const { data, error } = await supabase
            .from("livros")
            .update({ titulo, autor, descricao, preco, stock })
            .eq("id", id);

        if (error) return res.status(500).json({ error: error.message });
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: "Erro ao atualizar livro" });
    }
});

// Rota para excluir um livro
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("livros")
            .delete()
            .eq("id", id);

        if (error) return res.status(500).json({ error: error.message });
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: "Erro ao excluir livro" });
    }
});

// Rota para alugar (decrementar o estoque)
app.put("/alugar/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("livros")
            .update({ stock: supabase.raw('stock - 1') })
            .eq("id", id);

        if (error) return res.status(500).json({ error: error.message });
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: "Erro ao alugar livro" });
    }
});

// Rota para comprar (decrementar o estoque)
app.put("/comprar/:id", async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Tentando atualizar o estoque do livro com ID: ${id}`);
        
        // Decrementa o estoque do livro no Supabase
        const { data, error } = await supabase
            .from("livros")
            .update({ stock: supabase.raw('stock - 1') }) // Decrementa o estoque
            .eq("id", id); // Onde o ID do livro é igual ao parâmetro da URL

        if (error) {
            console.error('Erro ao atualizar livro:', error.message);
            return res.status(500).json({ error: error.message });
        }
        
        console.log('Livro atualizado com sucesso:', data);
        return res.json(data);
    } catch (err) {
        console.error('Erro inesperado:', err);
        return res.status(500).json({ error: "Erro ao comprar livro" });
    }
});

// Iniciar o servidor
app.listen(8081, () => {
    console.log("Servidor rodando na porta 8081");
});