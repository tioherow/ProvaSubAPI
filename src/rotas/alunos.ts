import { Router } from 'express';
import { listarAlunos, criarAluno, excluirAluno } from '../controladores/alunoControlador';

const alunoRotas = Router();

alunoRotas.get('/', listarAlunos);
alunoRotas.get('/novo', (req, res) => res.render('alunos/novo'));
alunoRotas.post('/', criarAluno);
alunoRotas.delete('/:id', excluirAluno); 

export default alunoRotas;
