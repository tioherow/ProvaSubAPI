import { Router } from 'express';
import { listarCursos, criarCurso, excluirCurso } from '../controladores/cursoControlador';

const cursoRotas = Router();

cursoRotas.get('/', listarCursos);
cursoRotas.get('/novo', (req, res) => res.render('cursos/novo'));
cursoRotas.post('/', criarCurso);
cursoRotas.delete('/:id', excluirCurso); 

export default cursoRotas;
