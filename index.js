import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const server = express(); //oferecendo ao desenvolvedor um servidor http de modo expresso

//recheando servidor com funcionalidades

server. get('/', (requisicao, resposta) => {
    resposta.send(`
        <DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 01 programa para internet usando node + express</title>
            </head>
            <body>
                <h1>Atividade 01 programa para internet usando node + express</h1>
                <h2>Olá, bem-vindo a página inicial</h2>
            </body>
            </html>

        `);
});

server.get('/horaAtual', (requisicao, resposta) => {
    const horaAtual = new Date();
    const hora = horaAtual.getHours() + ":" + horaAtual.getMinutes() + ":" + horaAtual.getSeconds();
    resposta.send(`
        <DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Horário do servidor</title>
         </head>
         <body>
            <h1>Agora são ${hora}</h1>
         </body>
         </html>
            
    `);
});

//criar um método que aceita parãmetros
server.get('/tabuada', (requisicao, resposta) => {
    //tabuada de qual numero e até qual sequencia?
    const numero = requisicao.query.numero;
    const sequecia = requisicao.query.sequencia;
    if (!numero || !sequecia) {
        resposta.send(`
        <DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabuada</title>
            </head>
            <body>
                <h1>tabuada</h1>
                <h2>Por favor, informe o número e sequencia na URL</h2>
                <h3>http://localhost:3000/tabuada?numero=5&sequencia=10</h3>
            </body>
        </html>
    `);
    }
    else{
        //informar para o navegador cliente que a resposta/conteúdo é html
        resposta.setHeader('Content-Type', 'text/html');
        
        resposta.write(`
            <DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabuada</title>
            </head>
            <body>
                <h1>tabuada do ${numero} até a sequencia de ${sequecia}</h1>
                <ul>
       `);

        for (let i = 1; i <= sequecia; i++) {
            resposta.write(`
                <li>${numero} x ${i} = ${numero * i}</li>`);
        }

        resposta.write(`
            </ul>
            </body>
            </html>
        `); 
        resposta.end(); //finaliza e envia
    }


});

server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});