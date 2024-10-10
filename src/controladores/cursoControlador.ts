import { Request, Response } from 'express';
import pool from '../configuracao/bancoDeDados';
import { Curso } from '../modelos/cursoModelo';

export const listarCursos = async (req: Request, res: Response) => {
    try {
        const [cursos] = await pool.query('SELECT * FROM Courses');
        res.render('cursos/lista', { cursos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const criarCurso = async (req: Request, res: Response) => {
    const { nome, descricao, duracao, preco } = req.body; 
    try {
        await pool.query('INSERT INTO Courses (name, description, duration, price) VALUES (?, ?, ?, ?)', [nome, descricao, duracao, preco]);
        res.redirect('/cursos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const excluirCurso = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        
        const [inscricoes] = await pool.query('SELECT * FROM Enrollments WHERE course_id = ?', [id]);
        
        if (Array.isArray(inscricoes) && inscricoes.length > 0) {
            return res.status(400).render('erro', { message: 'Não é possível excluir curso com alunos inscritos' });
        }

        await pool.query('DELETE FROM Courses WHERE course_id = ?', [id]);
        res.redirect('/cursos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

