import express, { Request, Response } from 'express';
import path from 'path';
import mustache from 'mustache-express';
import dotenv from 'dotenv';
import mainRoutes from './routes/index';

//dando acesso as variáveis de ambiente
dotenv.config();

const server = express();

server.set('view engine', 'mustache');//SETANDO O MUSTACHE COMO VIEW ENGINE
server.set('views', path.join(__dirname, 'views'));//DIZENDO ONDE ESTARÃO OS ARQUIVOS HTML 
server.engine('mustache', mustache());

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({extended: true}));

server.use(mainRoutes);

// CRIANDO  UMA ROTA PARA PÁGINA NÃO ENCONTRADA 
server.use((req: Request, res: Response)=>{
    res.status(404).send('Página não encontrada!');
});

server.listen(process.env.PORT);