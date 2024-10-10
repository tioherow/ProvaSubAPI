import express from 'express';
import { json, urlencoded } from 'body-parser';
import path from 'path';
import alunoRotas from './rotas/alunos';
import cursoRotas from './rotas/cursos';
import inscricaoRotas from './rotas/inscricoes';
import pool from './configuracao/bancoDeDados';

const app = express();
const port = 3000;

// Configurações do express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));
app.use(json());
app.use(urlencoded({ extended: true }));

// Rotas
app.use('/alunos', alunoRotas);
app.use('/cursos', cursoRotas);
app.use('/inscricoes', inscricaoRotas);

// Rota inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
