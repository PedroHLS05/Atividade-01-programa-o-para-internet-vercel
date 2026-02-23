const express = require("express");
const app = express();

const porta = process.env.porta // 3000;

app.get("/", (req, res) => {

    const { idade, sexo, salario_base, anoContratacao, matricula } = req.query;

    // Se não informar parâmetros, mostra instruções
    if (!idade || !sexo || !salario_base || !anoContratacao || !matricula) {
        return res.send(`
            <h2>Instruções</h2>
            <p>Informe na URL os seguintes dados:</p>
            <p>
            http://localhost:3000/?idade=18&sexo=F&salario_base=1700&anoContratacao=2014&matricula=12345
            </p>
        `);
    }

    // Conversões
    const idadeNum = parseInt(idade);
    const salarioNum = parseFloat(salario_base);
    const anoNum = parseInt(anoContratacao);
    const matriculaNum = parseInt(matricula);

    // Validações
    if (
        idadeNum <= 16 ||
        isNaN(salarioNum) ||
        anoNum <= 1960 ||
        matriculaNum <= 0
    ) {
        return res.send("<h3>Não foi possível realizar o cálculo. Dados inválidos.</h3>");
    }

    // Regra de reajuste (exemplo simples)
    let percentual = 0;

    if (sexo === "F") {
        percentual = 0.10;
    } else {
        percentual = 0.05;
    }

    if (anoNum < 2010) {
        percentual += 0.05;
    }

    const novoSalario = salarioNum + (salarioNum * percentual);

    res.send(`
        <h2>Dados do Funcionário</h2>
        <p>Idade: ${idadeNum}</p>
        <p>Sexo: ${sexo}</p>
        <p>Salário Base: R$ ${salarioNum.toFixed(2)}</p>
        <p>Ano de Contratação: ${anoNum}</p>
        <p>Matrícula: ${matriculaNum}</p>
        <hr>
        <h2 style="color:green;">
            Novo Salário: R$ ${novoSalario.toFixed(2)}
        </h2>
    `);
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});