import { Router } from 'express';
import { listarInscricoesPorAluno, listarInscricoesPorCurso, criarInscricao } from '../controladores/inscricaoControlador';

const inscricaoRotas = Router();

// Rota para listar inscrições por aluno
inscricaoRotas.get('/aluno/:id', listarInscricoesPorAluno);

// Rota para listar inscrições por curso
inscricaoRotas.get('/curso/:id', listarInscricoesPorCurso);

// Rota para criar uma nova inscrição
inscricaoRotas.post('/', criarInscricao);

export default inscricaoRotas;
